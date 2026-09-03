Main = []

Name = input("Enter your name: ")
Age = int(input("Enter your age: "))
Address = input("Enter your address: ")

Data = {}
Dictdata = []
def personaldata(a,b,c):
    Data["Name"] = print("Name: ",a)
    Data["Age"] = print("Age: ",b)
    Data["Address"] = print("Address: ",c)
    return "Name:",a,"Age:",b,"Address:",c


while True:
    userinput=int(input("Enter the number to fill qualication (1: Yes || 0: No): "))
    if userinput==1:
        education = {}
        education["Qualification"] = input("Enter your qualication: ")
        education["Passingyear"] = int(input("Enter your passing year: "))
    else:
        break    
   
def qualificationdata(a,b,c):
    print("Qualification: ",Qualification)
    print("Passing year: ",Passingyear)
    return "Qualification: ",a,"Passing year: ",b

Data1 = personaldata(Name,Age,Address)
Data2 = qualificationdata(Qualification,Passingyear)

   
Data3 = (Data1 + Data2) 

def Studentregistration():
    print("Student Registration Data")
    print(Data3)

Studentregistration()    
