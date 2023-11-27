#!/usr/bin/python

print ("Content-type: text/html\n\n")

import cgi, cgitb
from datetime import datetime

dateTimeObj = datetime.now()

print (dateTimeObj.hour, ":", dateTimeObj.minute, ":", dateTimeObj.second)
#print(output)

import platform

print(platform.python_version())

import numpy as np

from scipy.optimize import minimize

#from pyjarowinkler import distance

vocab = "hello good morning aligator alibaba"

word = "ali"

#vocab = data['vocab'].value

#word = data['word'].value

frameinfo = getframeinfo(currentframe())

import site
site.getsitepackages() # List of global package locations
#help(site)