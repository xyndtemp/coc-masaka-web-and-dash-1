import { getMembers } from './airtable';

// Mock email service for frontend
const mockSendEmail = async (to, subject, content) => {
  console.log(`Sending email to ${to}:`);
  console.log(`Subject: ${subject}`);
  console.log(`Content: ${content}`);
  return new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
};

export const sendBirthdayEmails = async () => {
  const members = await getMembers();
  const today = new Date().toISOString().slice(5, 10); // MM-DD format

  const birthdayMembers = members.filter(member => {
    const birthday = new Date(member.Birthday).toISOString().slice(5, 10);
    return birthday === today;
  });

  for (const member of birthdayMembers) {
    await mockSendEmail(
      member.Email,
      'Happy Birthday!',
      `Happy Birthday, ${member.Name}! We hope you have a fantastic day.`
    );
  }
};

export const sendManualEmail = async ({ to, subject, content }) => {
  await mockSendEmail(to, subject, content);
};