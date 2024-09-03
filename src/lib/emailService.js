import nodemailer from 'nodemailer';
import { format } from 'date-fns';
import { getMembers } from './airtable';

const transporter = nodemailer.createTransport({
  host: import.meta.env.VITE_EMAIL_HOST,
  port: import.meta.env.VITE_EMAIL_PORT,
  auth: {
    user: import.meta.env.VITE_EMAIL_USER,
    pass: import.meta.env.VITE_EMAIL_PASS,
  },
});

export const sendBirthdayEmails = async () => {
  const members = await getMembers();
  const today = format(new Date(), 'MM-dd');

  const birthdayMembers = members.filter(member => {
    const birthday = new Date(member.Birthday);
    return format(birthday, 'MM-dd') === today;
  });

  for (const member of birthdayMembers) {
    await transporter.sendMail({
      from: '"Your Organization" <noreply@yourorg.com>',
      to: member.Email,
      subject: 'Happy Birthday!',
      text: `Happy Birthday, ${member.Name}! We hope you have a fantastic day.`,
      html: `<p>Happy Birthday, <strong>${member.Name}</strong>!</p><p>We hope you have a fantastic day.</p>`,
    });
  }
};