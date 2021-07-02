from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from pathlib import Path
from collections import Counter

def sentiment(sentence):
    sample_text = sentence
    text_tokens = word_tokenize(sample_text)

    tokens_without_sw = [word for word in text_tokens if not word in stopwords.words('english')]
    emotion_list = []
    emotions = []
    script_location = Path(__file__).absolute().parent
    file_location = script_location / 'emotions.txt'
    with open(file_location, 'r') as file:
        for line in file:
            clear_line = line.replace("\n",'').replace(",",'').replace("'",'').strip()
            word, emotion = clear_line.split(':')
            emotions.append({word: emotion})
            if word in tokens_without_sw:
                emotion_list.append(emotion)
    w = Counter(emotion_list)
    return w

def polarity_analyzer(text):
    from nltk.sentiment.vader import SentimentIntensityAnalyzer
    score = SentimentIntensityAnalyzer().polarity_scores(text)
    return score

sentiment("whats up>>>>?")