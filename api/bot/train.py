import numpy as np
import random
import json

import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader

from nltk_utils import bag_of_words, tokenize, stem
from model import NeuralNet

# load the intents file, here we have the tags for the categorizing of the user sentences
with open('intents.json', 'r') as f:
    intents = json.load(f)

all_words = []
tags = []
xy = [] # here we will store the patterns and corresponding tags
# form a list with all the tags and another with all the words
# we need to collect all of the words in order to create the bag of words

# loop through each sentence in our intents patterns
for intent in intents['intents']:
    tag = intent['tag']
    # add to tag list
    tags.append(tag)
    for pattern in intent['patterns']:
        # tokenize each word in the sentence
        w = tokenize(pattern)
        # add to our words list
        all_words.extend(w)
        # add to xy pair
        xy.append((w, tag))

# stem and lower each word with the help of the functions in out nltk_utils file
ignore_words = ['?', '.', '!']
all_words = [stem(w) for w in all_words if w not in ignore_words]
# remove duplicates and sort from the words and the tags lists
all_words = sorted(set(all_words))
tags = sorted(set(tags))

# create training data
X_train = [] #all bags of words -> input 
y_train = [] #all tags -> output
for (pattern_sentence, tag) in xy:
    # x: bag of words for each pattern_sentence
    bag = bag_of_words(pattern_sentence, all_words)
    X_train.append(bag)
    # y: tag for the sentence
    label = tags.index(tag)
    y_train.append(label)

X_train = np.array(X_train)
y_train = np.array(y_train)

# Hyper-parameters

# number of passes of the entire training dataset the machine learning algorithm has completed
num_epochs = 1000

batch_size = 8
hidden_size = 8

# controls how much to change the model in response to the estimated error each time the model weights are updated
learning_rate = 0.001

#input size will be the size of all the bags of words we created, which is the same as out X_train 
input_size = len(X_train[0])
#output size will be the size of the tags list
output_size = len(tags)



class ChatDataset(Dataset):

    def __init__(self):
        self.n_samples = len(X_train)
        self.x_data = X_train
        self.y_data = y_train

    # support indexing such that dataset[i] can be used to get i-th sample
    def __getitem__(self, index):
        return self.x_data[index], self.y_data[index]

    # we can call len(dataset) to return the size
    def __len__(self):
        return self.n_samples


dataset = ChatDataset()
# provide an iterable over the dataset
train_loader = DataLoader(dataset=dataset,
                          batch_size=batch_size,
                          shuffle=True,
                          num_workers=0)


# specify the device type responsible to load a tensor into memory
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

#initialize our model and push it to the device if available
model = NeuralNet(input_size, hidden_size, output_size).to(device)

# Loss function - pytorch's CrossEntropy
# it is evaluating how well the algorithm models the given data
criterion = nn.CrossEntropyLoss()

# Optimizer
# Adam - replacement optimization algorithm for stochastic gradient descent
# used to change the attributes of the neural network (such as weights and learning rate) to reduce the losses
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

# Train the model
for epoch in range(num_epochs):
    for (words, labels) in train_loader:
        words = words.to(device)
        labels = labels.to(dtype=torch.long).to(device)

        # Forward pass
        outputs = model(words)
        # if y would be one-hot, we must apply
        # labels = torch.max(labels, 1)[1]
        loss = criterion(outputs, labels)

        # Backward and optimize
        # empty the gradients
        optimizer.zero_grad()

        # calculate the back propagation
        loss.backward()
        
        # update the parameters
        optimizer.step()

    if (epoch + 1) % 100 == 0:
        print(f'Epoch [{epoch + 1}/{num_epochs}], Loss: {loss.item():.4f}')

print(f'final loss: {loss.item():.4f}')

data = {
    "model_state": model.state_dict(),
    "input_size": input_size,
    "hidden_size": hidden_size,
    "output_size": output_size,
    "all_words": all_words,
    "tags": tags
}

# save the file
FILE = "data.pth"
torch.save(data, FILE)

print(f'training file saved to {FILE}')