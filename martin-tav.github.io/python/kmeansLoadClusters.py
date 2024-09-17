

import cgi, cgitb

cgitb.enable()   #..and this are not really necessary but helps debuging

data= cgi.FieldStorage()
import importlib
import sklearn

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics import adjusted_rand_score
from scipy import sparse
print ("HTTP/1.0 200 OK\n")

import pandas as pd
import os
os.chdir("D:/sites/main/py/")
os.getcwd()
import json  
import numpy as np
import pickle

filename = 'kmeans.sav'
vectorizerfile = 'vectorizer.obj'
matrixFile = 'KMeansX.npz'

# load the model from disk
vectorizer = pickle.load(open(vectorizerfile, 'rb'))

# load matrix
X = sparse.load_npz(matrixFile)

# load vectorizer
model = pickle.load(open(filename, 'rb'))
modelscore = model.score(X)
#print(modelscore)


true_k = 5
#print("Top terms per cluster:\n")
order_centroids = model.cluster_centers_.argsort()[:, ::-1]
terms = vectorizer.get_feature_names()
for i in range(true_k):
   print(";Cluster %d:" % i),
   for ind in order_centroids[i, :10]:
       print(' %s' % terms[ind]),
   print
