import nodemailer from 'nodemailer';

/**
 * Configure email transporter.
 * Falls back to console logging when SMTP credentials are not configured.
 */
let transporter = null;

const isSmtpConfigured = Boolean(
  process.env.SMTP_HOST &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS
);

if (isSmtpConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * Send notification email or log to console in dev mode.
 */
export async function sendNotificationEmail({ subject, html, text }) {
  const recipient = process.env.NOTIFY_EMAIL || 'admissions@skillnova.edu';

  if (!transporter) {
    console.log('\n[MAILER MOCK (SMTP not configured)]');
    console.log(`To: ${recipient}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${text || html}`);
    console.log('------------------------------------\n');
    return { success: true, mocked: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"SkillNova Academy" <${process.env.SMTP_USER}>`,
      to: recipient,
      subject,
      text,
      html,
    });
    console.log(`Email delivered successfully: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    // Do not throw so the API response still completes
    return { success: false, error: error.message };
  }
}
