import os
import json

jsondata=[{"id":102,"name":"tarique","address":"Bihar"},{"id":103,"name":"tabish","address":"bihar"}]
path=os.getcwd()+"\\jsondataexample.json"
#with open(path,"a") as f:
 #  f.write(json.dumps(jsondata,indent=4))
names=[]
with open(path,"r") as f:

     names = json.load(f)    

counter=0

userunput=input("please enter your name: ")
for item in names:

    if item["name"]==userunput.lower():
          counter=1
        


if counter==1:
     print("Matched")

else:
    print("Not matched")