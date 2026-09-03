Data = []

def information():
    dictdata = {}
    dictdata["Name"]=input(f"Enter student name: ")
    dictdata["Address"]=input(f"Enter student address: ")
    dictdata["Contact"]=input(f"Enter student contact number: ")
    Data.append(dictdata)
    print("************************************************************")

    while True:
        x = input("Do you want to add more data:(y:yes || n:no): ")
        if x=='y':
            dictdata = {}
            dictdata["Name"]=input(f"Enter student name: ")
            dictdata["Address"]=input(f"Enter student address: ")
            dictdata["Contact"]=input(f"Enter student contact number: ")
            Data.append(dictdata)
            print("************************************************************")

        else:
            break    

    return Data   
 