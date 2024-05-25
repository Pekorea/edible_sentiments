from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment")
model = AutoModelForSequenceClassification.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment")

# Function to analyze sentiment
def analyze_sentiment(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    outputs = model(**inputs)
    probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
    sentiment = torch.argmax(probs, dim=1).item()

    labels = ["Negative", "Neutral", "Positive"]
    sentiment_label = labels[sentiment]
    confidence_score = probs[0][sentiment].item()

    return sentiment_label, confidence_score

@app.route('/analyze_sentiment', methods=['POST'])
def analyze_sentiment_route():
    data = request.json
    comment = data['comment']

    # Get sentiment analysis result
    sentiment_label, confidence_score = analyze_sentiment(comment)
    
    response = {
        'label': sentiment_label,
        'score': confidence_score
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
