
def searchdata(data1):
    userinput = input("Enter a contact number you want to search: ")
    flagtocheck=False
    for d in data1:
        if d["Contact"] == userinput:
            print(d)
            flagtocheck=True
        
        
    if flagtocheck:
        print("The record is available ")     
    else:
        print("The Record does not exists")
           