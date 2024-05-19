from flask import Flask, request, jsonify
from textblob import TextBlob
from dataclasses import dataclass
from flask_cors import CORS

@dataclass
class Mood:
    sentimental: str
    sentiment: float

def get_mood(input_text: str, *, threshold: float) -> Mood:
    sentiment: float = TextBlob(input_text).sentiment.polarity

    friendly_threshold: float = threshold
    hostile_threshold: float = -threshold

    if sentiment >= friendly_threshold:
        return Mood('Positive😊', sentiment)
    elif sentiment <= hostile_threshold:
        return Mood('Negative😡', sentiment)
    else:
        return Mood('Neutral😑', sentiment)

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data.get('text')
    threshold = data.get('threshold', 0.3)
    mood = get_mood(text, threshold=threshold)
    return jsonify(sentimental=mood.sentimental, sentiment=mood.sentiment)

if __name__ == '__main__':
    app.run(debug=True)
