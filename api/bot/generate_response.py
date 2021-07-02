import random
import json
import torch
from .model import NeuralNet
from .nltk_utils import bag_of_words, tokenize
from pathlib import Path
script_location = Path(__file__).absolute().parent
file_location = script_location / 'intents.json'



def generate_response(user_input):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    with open(file_location, 'r') as json_data:
        intents = json.load(json_data)

    # initialize model from the torch file
    FILE = script_location / "data.pth"
    data = torch.load(FILE)

    input_size = data["input_size"]
    hidden_size = data["hidden_size"]
    output_size = data["output_size"]
    all_words = data['all_words']
    tags = data['tags']
    model_state = data["model_state"]

    model = NeuralNet(input_size, hidden_size, output_size).to(device)
    # load the state of the model - learns learning parameters
    model.load_state_dict(model_state)
    # dropout and batch normalization layers to evaluation mode
    model.eval()

    # normalize the sentence
    sentence = user_input

    sentence = tokenize(sentence)
    X = bag_of_words(sentence, all_words)
    # reshape X in the expected state by the model
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    # get the tensor for the output data
    output = model(X)
    # print("OUTPUT:: ", output)

    # return the maximum value of all elements in the input tensor.
    _, predicted = torch.max(output, dim=1)

    # predicted tag
    tag = tags[predicted.item()]

    # apply softmax to the tensor output vector -> convert it into a vector of probabilities
    probs = torch.softmax(output, dim=1)

    # get the probability of the predicted item
    prob = probs[0][predicted.item()]
    # if prob is high enough, return a random response from the intents file, otherwise no
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                return (True,random.choice(intent['responses']),tag) 
    else:
        return (False,"I do not understand...","")
