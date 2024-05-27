from transformers import pipeline

# Initialize the sentiment analysis pipeline
sentiment_pipeline = pipeline("sentiment-analysis", model="juliensimon/reviews-sentiment-analysis")

# Ask the user to input text
text = input("Enter your text: ")

# Analyze sentiment
result = sentiment_pipeline(text)

# Print the result
print(result)
