import { ContactMessage } from '../models/ContactMessage.js';
import { sendNotificationEmail } from '../config/mailer.js';

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

    // Send email notification asynchronously
    sendNotificationEmail({
      subject: `New Contact Inquiry from ${fullName}`,
      text: `A new message was submitted via the contact form:\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nMessage: ${message}\n\nSubmitted at: ${contact.createdAt}`,
      html: `
        <h2>New Contact Inquiry</h2>
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
