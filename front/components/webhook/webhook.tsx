"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

const WebHook = () => {
    const [chapter, setChapter] = useState({ chapterNumber: 0, title: '' });
    const [animation, setAnimation] = useState(false);

    useEffect(() => {
        const fetchLatestChapter = async () => {
            try {
                const response = await axios.get('/api/webhook');
                const data = response.data;
                if (data.chapterNumber !== chapter.chapterNumber) {
                    setChapter(data);
                    setAnimation(true);
                    setTimeout(() => {
                        setAnimation(false);
                    }, 3000); // Animation duration
                }
            } catch (error) {
                console.error('Error fetching latest chapter:', error);
            }
        };

        const interval = setInterval(fetchLatestChapter, 5000); // Poll every 5 seconds

        return () => clearInterval(interval);
    }, [chapter]);

    return (
        <div>
            <h1>Latest Chapter Notification</h1>
            {animation && (
                <div className="animation">
                    New Chapter Released: {chapter.chapterNumber} - {chapter.title}
                </div>
            )}
            <style jsx>{`
        .animation {
          animation: fadeInOut 3s;
        }

        @keyframes fadeInOut {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
        </div>
    );
}

export default WebHook;