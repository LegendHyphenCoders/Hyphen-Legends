import { Admission } from '../models/Admission.js';
import { sendNotificationEmail } from '../config/mailer.js';
import { appendAdmissionLead, generateExcelBuffer } from '../utils/excelService.js';

/**
 * @route   POST /api/admissions
 * @desc    Submit an admission lead capture inquiry
 * @access  Public
 */
export async function createAdmission(req, res, next) {
  try {
    const { fullName, email, phone, courseSlug, currentStatus, preferredTiming, message } = req.body;

    let admission = null;
    try {
      admission = await Admission.create({
        fullName,
        email,
        phone,
        courseSlug,
        currentStatus,
        preferredTiming,
        message,
      });
    } catch (dbErr) {
      console.warn('⚠️ MongoDB write warning (recording directly to leads.xlsx):', dbErr.message);
    }

    const leadData = admission || {
      _id: `OFFLINE-${Date.now()}`,
      fullName,
      email,
      phone,
      courseSlug,
      currentStatus,
      preferredTiming,
      message,
      status: 'new',
      createdAt: new Date(),
    };

    // Auto-update leads.xlsx on disk row by row
    await appendAdmissionLead(leadData).catch((excelErr) => {
      console.error('Background Excel update error:', excelErr.message);
    });

    // Send email notification asynchronously
    sendNotificationEmail({
      subject: `New admission inquiry — HL Stack: ${fullName} (${courseSlug})`,
      text: `A new candidate submitted an admission enquiry:\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nCourse: ${courseSlug}\nStatus: ${currentStatus}\nPreferred Timing: ${preferredTiming}\nMessage: ${message || 'None'}\n\nSubmitted at: ${leadData.createdAt}`,
      html: `
        <h2>New Admission Inquiry — HL Stack</h2>
        <p><strong>Candidate Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Course Program:</strong> ${courseSlug}</p>
        <p><strong>Candidate Status:</strong> ${currentStatus}</p>
        <p><strong>Preferred Timing:</strong> ${preferredTiming}</p>
        <p><strong>Message:</strong> ${message || 'None provided'}</p>
        <p><small>Timestamp: ${leadData.createdAt}</small></p>
      `,
    }).catch((mailErr) => console.error('Background mailer error:', mailErr.message));

    return res.status(201).json({
      message: 'Admission inquiry submitted successfully.',
      admission: leadData,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/admissions
 * @desc    Get all admissions (for admin reference)
 * @access  Internal
 */
export async function getAdmissions(req, res, next) {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    return res.status(200).json({ count: admissions.length, admissions });
  } catch (error) {
    next(error);
  }
}
