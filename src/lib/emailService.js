import axios from 'axios';
import { getMembers } from './airtable';

const Email = {
  send: function (a) {
    return new Promise(function (n) {
      (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
      var t = JSON.stringify(a);

      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
        n(e);
      });
    });
  },
  ajaxPost: function (e, n, t) {
    var a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
      (a.onload = function () {
        var e = a.responseText;
        null != t && t(e);
      }),
      a.send(n);
  },
  ajax: function (e, n) {
    var t = Email.createCORSRequest("GET", e);

    (t.onload = function () {
      var e = t.responseText;
      null != n && n(e);
    }),
      t.send();
  },
  createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest();

    return (
      "withCredentials" in t
        ? t.open(e, n, true)
        : (t = null),
      t
    );
  },
};


export const generateEmailTemplate = (content) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GreenField Executive Education</title>
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
        <img style={{
   // center the image
   display: block;
   margin-left: auto;
   margin-right: auto;
        }} src="https://greenfieldexedu.com/wp-content/uploads/2024/05/logo3.png" alt="GreenField Executive Education" />
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} GreenField Executive Education. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const generateBirthdayEmailtemplate = ( name) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GreenField Organization</title>
    </head>
    <body>
      <h1>Happy Birthday, ${name}!</h1>
      <p>We hope you have a fantastic day.</p>
    </body>
    </html>
  `;
}
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_PLUNK_API_KEY}`,
  }
})

export const sendEmail = async ({ to, subject, body }) => {
  try {
    const response = await axiosInstance.post('https://api.useplunk.com/v1/send',
      {
      to,
      subject,
      body,
    });

    return response;

  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Alternative implementation using SMTP.js
export const sendEmailSMTP = ({ to, subject, body }) => {
  // Import Email from 'smtp.js' if not already imported at the top of the file
  return Email.send({
    Host: import.meta.env.VITE_SMTP_HOST,
    Username: import.meta.env.VITE_SMTP_USERNAME,
    Password: import.meta.env.VITE_SMTP_PASSWORD,
    To: to,
    From: import.meta.env.VITE_SMTP_FROM_EMAIL,
    Subject: subject,
    Body: body
  }).then(
    message => console.log(message)
  );
};

export const sendBirthdayEmails = async () => {
  const members = await getMembers();
  const today = new Date().toISOString().slice(5, 10); // MM-DD format

  const birthdayMembers = members.filter(member => {
    const birthday = new Date(member.Birthday).toISOString().slice(5, 10);
    return birthday === today;
  });
  
  for (const member of birthdayMembers) {
    await sendEmail(
      member.Email,
      'Happy Birthday!',
      generateBirthdayEmailtemplate(member.Name)
    );
  }
};