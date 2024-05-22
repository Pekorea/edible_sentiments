from transformers import pipeline

sentiment_pipeline = pipeline("sentiment-analysis")

def get_sentiment(text):
    result = sentiment_pipeline(text)[0]
    sentiment = result['label']
    score = result['score']
    
   # if sentiment == 'POSITIVE':
    #    emoji = '😊'
    #elif sentiment == 'NEGATIVE':
     #   emoji = '😡'
    #else:
     #   emoji = '😑'

    return sentiment, score

if __name__ == '__main__':
    while True:
        text = input('Enter text: ')
        emoji, score = get_sentiment(text)
        print(f'Sentiment: {sentiment} (Score: {score})')
