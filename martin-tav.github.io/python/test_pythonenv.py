#!/bin/python
print ("Content-type: text/html\n\n")
print("hello2")
print("br")

import cgi, cgitb
from datetime import datetime

dateTimeObj = datetime.now()

print (dateTimeObj.hour, ":", dateTimeObj.minute, ":", dateTimeObj.second)

#print(output)

import platform

print(platform.python_version())

print(platform.platform())

import numpy as np

from scipy.optimize import minimize

#from pyjarowinkler import distance