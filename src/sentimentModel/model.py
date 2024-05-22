from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

sentiment_pipeline = pipeline("sentiment-analysis")

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data.get('text')
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    result = sentiment_pipeline(text)
    sentiment = result[0]['label']
    score = result[0]['score']

    # Convert sentiment label to an emoji
    if sentiment == 'POSITIVE':
        emoji = '😊'
    elif sentiment == 'NEGATIVE':
        emoji = '😡'
    else:
        emoji = '😑'

    return jsonify(emoji=emoji, sentiment=score)

if __name__ == '__main__':
    app.run(debug=True)
