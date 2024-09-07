import { getMembers } from '../../lib/airtable';
import { sendEmail, generateEmailTemplate } from '../../lib/emailService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const members = await getMembers();
      const today = new Date().toISOString().slice(5, 10); // MM-DD format

      const birthdayMembers = members.filter(member => {
        const birthday = new Date(member.Birthday).toISOString().slice(5, 10);
        return birthday === today;
      });

      for (const member of birthdayMembers) {
        const emailContent = generateEmailTemplate(`
          <h1>Happy Birthday, ${member.Name}!</h1>
          <p>Wishing you a fantastic day filled with joy and celebration.</p>
          <p>Best wishes from the GreenField team!</p>
        `);

        await sendEmail({
          to: member.email,
          subject: 'Happy Birthday from GreenField!',
          body: emailContent,
        });
      }

      res.status(200).json({ message: `Sent ${birthdayMembers.length} birthday emails` });
    } catch (error) {
      console.error('Error in birthday check:', error);
      res.status(500).json({ error: 'Failed to process birthday emails' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}