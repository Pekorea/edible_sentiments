from flask import Flask, request, jsonify
from textblob import TextBlob
from dataclasses import dataclass
from flask_cors import CORS

@dataclass
class Mood:
    emoji: str
    sentiment: float

def get_mood(input_text: str, *, threshold: float) -> Mood:
    sentiment: float = TextBlob(input_text).sentiment.polarity

    friendly_threshold: float = threshold
    hostile_threshold: float = -threshold

    if sentiment >= friendly_threshold:
        return Mood('POSITIVE😊', sentiment)
    elif sentiment <= hostile_threshold:
        return Mood('NEGATIVE😡', sentiment)
    else:
        return Mood('NEUTRAL😑', sentiment)

app = Flask(__name__)
CORS(app)  

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data.get('text')
    threshold = data.get('threshold', 0.3)
    mood = get_mood(text, threshold=threshold)
    return jsonify(emoji=mood.emoji, sentiment=mood.sentiment)

if __name__ == '__main__':
    app.run(debug=True)
