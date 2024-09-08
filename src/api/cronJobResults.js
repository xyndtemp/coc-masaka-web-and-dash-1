import fs from 'fs';
import path from 'path';

const resultsFilePath = path.join(process.cwd(), 'cronJobResults.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      if (fs.existsSync(resultsFilePath)) {
        const results = JSON.parse(fs.readFileSync(resultsFilePath, 'utf8'));
        res.status(200).json(results);
      } else {
        res.status(200).json({ message: 'No cron job results available yet' });
      }
    } catch (error) {
      console.error('Error reading cron job results:', error);
      res.status(500).json({ error: 'Failed to read cron job results' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}