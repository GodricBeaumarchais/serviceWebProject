import { NextApiRequest, NextApiResponse } from 'next';

let latestChapter = { chapterNumber: 0, title: '' };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { chapterNumber, title } = req.body;
        latestChapter = { chapterNumber, title };

        console.log(`Received notification for Chapter ${chapterNumber}: ${title}`);
        res.status(200).json({ message: 'Notification received' });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}

export function getLatestChapter() {
    return latestChapter;
}