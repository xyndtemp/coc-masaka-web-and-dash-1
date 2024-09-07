import { getMembers } from '../../lib/airtable';
import { sendEmail, generateEmailTemplate } from '../../lib/emailService';
import fs from 'fs';
import path from 'path';

const resultsFilePath = path.join(process.cwd(), 'cronJobResults.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const members = await getMembers();
      const today = new Date().toISOString().slice(5, 10); // MM-DD format

      const birthdayMembers = members.filter(member => {
        const birthday = new Date(member.Birthday).toISOString().slice(5, 10);
        return birthday === today;
      });

      let emailsSent = 0;
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
        emailsSent++;
      }

      const results = {
        lastRun: new Date().toISOString(),
        emailsSent,
        status: 'success'
      };

      fs.writeFileSync(resultsFilePath, JSON.stringify(results));

      res.status(200).json({ message: `Sent ${emailsSent} birthday emails`, ...results });
    } catch (error) {
      console.error('Error in birthday check:', error);
      const results = {
        lastRun: new Date().toISOString(),
        emailsSent: 0,
        status: 'error'
      };
      fs.writeFileSync(resultsFilePath, JSON.stringify(results));
      res.status(500).json({ error: 'Failed to process birthday emails', ...results });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}