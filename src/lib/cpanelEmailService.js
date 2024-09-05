import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: import.meta.env.VITE_CPANEL_SMTP_HOST,
  port: import.meta.env.VITE_CPANEL_SMTP_PORT,
  secure: true,
  auth: {
    user: import.meta.env.VITE_CPANEL_EMAIL,
    pass: import.meta.env.VITE_CPANEL_EMAIL_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: import.meta.env.VITE_CPANEL_EMAIL,
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
          <p>© 2023 GreenField Organization. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};