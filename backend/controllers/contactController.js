import { ContactMessage } from '../models/ContactMessage.js';
import { sendNotificationEmail } from '../config/mailer.js';
import { appendContactMessage } from '../utils/excelService.js';

/**
 * @route   POST /api/contact
 * @desc    Submit a contact inquiry message
 * @access  Public
 */
export async function createContactMessage(req, res, next) {
  try {
    const { fullName, email, phone, message } = req.body;

    let contact = null;
    try {
      contact = await ContactMessage.create({
        fullName,
        email,
        phone: phone || '',
        message,
      });
    } catch (dbErr) {
      console.warn('⚠️ MongoDB write warning (recording directly to leads.xlsx):', dbErr.message);
    }

    const leadData = contact || {
      _id: `OFFLINE-${Date.now()}`,
      fullName,
      email,
      phone: phone || '',
      message,
      isRead: false,
      createdAt: new Date(),
    };

    // Auto-update leads.xlsx on disk row by row
    await appendContactMessage(leadData).catch((excelErr) => {
      console.error('Background Excel update error:', excelErr.message);
    });

    // Send email notification asynchronously
    sendNotificationEmail({
      subject: `New contact message — HL Stack: ${fullName}`,
      text: `A new message was submitted via the contact form:\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nMessage: ${message}\n\nSubmitted at: ${leadData.createdAt}`,
      html: `
        <h2>New Contact Message — HL Stack</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background:#f4f4f4;padding:12px;border-left:4px solid #6366f1;">${message}</blockquote>
        <p><small>Timestamp: ${leadData.createdAt}</small></p>
      `,
    }).catch((mailErr) => console.error('Background mailer error:', mailErr.message));

    return res.status(201).json({
      message: 'Contact message received successfully.',
      contact: leadData,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/contact
 * @desc    Get all contact messages (for admin reference)
 * @access  Internal
 */
export async function getContactMessages(req, res, next) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.status(200).json({ count: messages.length, messages });
  } catch (error) {
    next(error);
  }
}
