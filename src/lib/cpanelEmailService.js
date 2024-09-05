// Note: This is a mock implementation for frontend use.
// For actual email sending, this should be implemented on the backend.

const mockTransporter = {
  sendMail: ({ from, to, subject, html }) => {
    console.log('Mock email sent:');
    console.log(`From: ${from}`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`HTML Content: ${html}`);
    return Promise.resolve({ messageId: 'mock-message-id' });
  }
};

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await mockTransporter.sendMail({
      from: 'noreply@example.com', // Replace with your actual email
      to,
      subject,
      html,
    });
    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const generateEmailTemplate = (content) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GreenField Organization</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4CAF50; color: white; padding: 10px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { text-align: center; margin-top: 20px; font-size: 0.8em; color: #777; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>GreenField Organization</h1>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} GreenField Organization. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Backend implementation (commented out):
/*
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.CPANEL_SMTP_HOST,
  port: process.env.CPANEL_SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.CPANEL_EMAIL,
    pass: process.env.CPANEL_EMAIL_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.CPANEL_EMAIL,
      to,
      subject,
      html,
    });
    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
*/