import { scheduleJob } from 'node-schedule';
import { sendBirthdayEmails } from './lib/emailService';

// Schedule the job to run every day at 12:01 AM WAT
scheduleJob('1 0 * * *', async () => {
  console.log('Running birthday check...');
  try {
    await sendBirthdayEmails();
    console.log('Birthday emails sent successfully');
  } catch (error) {
    console.error('Error sending birthday emails:', error);
  }
});

console.log('Birthday check scheduled');