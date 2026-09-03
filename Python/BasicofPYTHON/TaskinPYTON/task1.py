# Student information
student = []

for record in range(2):

    dictdata = {}  
    education = [] 
    eudcationdict = {}
    
    dictdata["id"] = int(input("Please enter student id: "))
    dictdata["name"] = input("Please enter Student name: ")
      
    eudcationdict["qualification"] = input("Please enter qualification name: ")
    eudcationdict["year"] = input("Please enter passing year: ")
    education.append(eudcationdict)
    
    eudcationdict = {}  
    eudcationdict["qualification"] = input("Please enter qualification name: ")
    eudcationdict["year"] = input("Please enter passing year: ")
    education.append(eudcationdict)
    
    dictdata["education"] = education  
    student.append(dictdata)
    
print(student)  