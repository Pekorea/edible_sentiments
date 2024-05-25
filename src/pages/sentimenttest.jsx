import React, { useState } from 'react';

const SentimentAnalyzer = () => {
    const [comment, setComment] = useState('');
    const [result, setResult] = useState(null);

    const analyzeSentiment = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/analyze_sentiment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment }),
            });
            const data = await response.json();
            setResult(data);
            console.log(data);
        } catch (error) {
            console.error('Error analyzing sentiment:', error);
        }
    };

    return (
        <div className='fufu'>
            <h1>Sentiment Analyzer</h1>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                cols="50"
                className='prepsentText'
            />
            <br />
            <button onClick={analyzeSentiment}>Analyze</button>
            {result && (
                <div>
                    <p>Label: {result.label}</p>
                    <p>Score: {result.score}</p>
                </div>
            )}
        </div>
    );
};

export default SentimentAnalyzer;
