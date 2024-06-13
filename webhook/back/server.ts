import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3002;

app.use(bodyParser.json());

app.post('/new-chapter', async (req, res) => {
    const { chapterNumber, title } = req.body;

    // Envoyer une notification au serveur B
    try {
        await axios.post('http://localhost:3000/api/webhook', {
            chapterNumber,
            title
        });
        console.log(`Notification sent for Chapter ${chapterNumber}: ${title}`);
    } catch (error) {
        console.error('Error sending notification to Server B:', error);
    }

    res.json({ message: 'Notification sent' });
});

app.listen(port, () => {
    console.log(`Server A is running on port ${port}`);
});