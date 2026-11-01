import { ContactMessage } from '../models/ContactMessage.js';
import { sendNotificationEmail } from '../config/mailer.js';
import { appendContactMessage, generateExcelBuffer } from '../utils/excelService.js';

/**
 * @route   POST /api/contact
 * @desc    Submit a contact inquiry message
 * @access  Public
 */
export async function createContactMessage(req, res, next) {
  try {
    const { fullName, email, phone, message } = req.body;

    const contact = await ContactMessage.create({
      fullName,
      email,
      phone: phone || '',
      message,
    });

    // Auto-update leads.xlsx on disk row by row
    appendContactMessage(contact).catch((excelErr) => {
      console.error('Background Excel update error:', excelErr.message);
    });

    // Send email notification asynchronously
    sendNotificationEmail({
      subject: `New contact message — HL Stack: ${fullName}`,
      text: `A new message was submitted via the contact form:\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nMessage: ${message}\n\nSubmitted at: ${contact.createdAt}`,
      html: `
        <h2>New Contact Message — HL Stack</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background:#f4f4f4;padding:12px;border-left:4px solid #6366f1;">${message}</blockquote>
        <p><small>Timestamp: ${contact.createdAt}</small></p>
      `,
    }).catch((mailErr) => console.error('Background mailer error:', mailErr.message));

    return res.status(201).json({
      message: 'Contact message received successfully.',
      contact,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/contact
 * @desc    Get all contact messages (for admin reference)
 * @access  Public / Internal
 */
export async function getContactMessages(req, res, next) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.status(200).json({ count: messages.length, messages });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/contact/export-excel
 * @desc    Export all contact inquiries to an Excel (.xlsx) file download
 * @access  Public / Internal
 */
export async function exportContactExcel(req, res, next) {
  try {
    const contacts = await ContactMessage.find().sort({ createdAt: -1 });
    const buffer = await generateExcelBuffer([], contacts);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="HL_Stack_Contact_Messages.xlsx"');
    return res.send(Buffer.from(buffer));
  } catch (error) {
    next(error);
  }
}
