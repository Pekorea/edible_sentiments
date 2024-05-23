import React, { useState } from 'react';

const SentimentAnalyzer = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);

    const analyzeSentiment = async () => {
        const response = await fetch('http://127.0.0.1:5000/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, threshold: 0.3 }),
        });
        const data = await response.json();
        setResult(data);
        console.log(data)
    };

    return (
        <div className='fufu'>
            <h1>Sentiment Analyzer</h1>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows="4"
                cols="50"
            />
            <br />
            <button onClick={analyzeSentiment}>Analyze</button>
            {result && (
                <div>
                    <p>Emoji: {result.emoji}</p>
                    <p>Sentiment Score: {result.sentiment}</p>
                </div>
            )}
        </div>
    );
};

export default SentimentAnalyzer;
