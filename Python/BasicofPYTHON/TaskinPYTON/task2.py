student = []

for record in range(2):

    dictdata = {}  
    education = [] 
    
    dictdata["id"] = int(input("Please enter student id: "))
    dictdata["name"] = input("Please enter Student name: ")

    while True:
        x = (input("Do you want to add qualification: y for yes; n for no: "))
        if x=='y':

            eudcationdict = {}  
            eudcationdict["qualification"] = input("Please enter qualification name: ")
            eudcationdict["year"] = input("Please enter passing year: ")
            education.append(eudcationdict)

        else:
            break    
            
    dictdata["education"] = education
    student.append(dictdata)
        
print(student)     