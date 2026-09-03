import json

students_data=[]

def School_student_registration():
    """This is student registration form"""
    student_information = {}
    student_information["Id"] = input("Enter your id: ")
    student_information["Name"] = input("Enter your name: ")
    student_information["Age"] = input("Enter your age: ")
    student_information["Address"] = input("Enter your Address: ")
    student_information["Contact_number"] = input("Enter your Contact number: ")
    student_information["Email_id"] = input("Enter your Email id: ")
    student_information["Qualification"] = student_qualification()

    students_data.append(student_information)
      
def student_qualification():
    """Stores student's qualification details"""
    qualification_list = []

    while True:
        qualification_data = {}
        qualification_data["Qualification_Name"] = input("Enter your qualification name: ")
        qualification_data["Passing_year"] = input("Enter your passing year: ")

        qualification_list.append(qualification_data)

    return qualification_list    
    
def display_student_data():
    """Display registered student data in JSON format"""
    print(json.dumps(students_data,indent=4))    

def menu():
    """Display the main menu options"""
    print("Enter 1 for Registration.")
    print("Enter 2 for Display data.")
    print("Enter 3 for Exit.") 

def option():
    """Handles user input and executes accordingly"""
    while True:
        userinput = int(input("Enter any number(Either 1, 2 or 3): "))
        if userinput == 1:
            School_student_registration()
            student_qualification()

        elif userinput == 2:
            display_student_data()
           
        elif userinput == 3:
            print("Goodbye!!")
            break 

        else:
            print("Invalid Number.Enter either 1, 2 or 3.")       

def student_menu():
    """Displays the student registration menu and processes user input""" 
    menu()
    option()
   
student_menu()               

