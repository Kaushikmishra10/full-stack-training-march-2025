import json

class registration():
    students_data = []
    def School_student_registration(self):
        """This is student registration form"""
        student_information = {}

        student_information["Id"] = None
        while True:
            self.id = input("Enter your id: ")
            if self.id.isdigit():
                student_information["Id"] == self.id
                break
            else:
                print("Only numbers are allowed.")

        student_information["Name"] = None
        while True:
            self.name = input("Enter your name: ")
            if self.name.isalpha():
                student_information["Name"] == self.name
                break
            else:
                print("Only character values are allowed.")

        student_information["Age"] = None
        while True:
           self.age = input("Enter your age: ")
           if self.age.isdigit():
               self.age_value = int(self.age)
               if self.age_value <= 100:
                   student_information["Age"] == self.age_value
                   break
               else:
                   print("Age limit exceeded.")
           else:
               print("Only numeric values are allowed.") 

        student_information["Address"] = None
        while True:
            self.address = input("Enter your Address: ")
            if self.address.isalpha():
                student_information["Address"] == self.address
                break
            else:
                print("Only numeric values are allowed.")

        student_information["Contact_number"] = None
        while True:
            self.contact_number = input("Enter your Contact number: ")
            if self.contact_number.isdigit():
                if len(self.contact_number) == 10:
                    student_information["Contact_number"] == self.contact_number
                    break
                else:
                    print("Invalid mobile number(only ten characters).")
            else:
                print("Only numbers are allowed.")        

        student_information["Email_id"] = None
        while True:
            self.email_id = input("Enter your Email id: ")
            if "@gmail.com" in self.email_id:
                student_information["Email_id"] == self.email_id
                break
            else:
                print("Invalid Email id.")

        student_information["Qualification"] = self.student_qualification()

        self.students_data.append(student_information)

    def student_qualification(self):
        """Stores student's qualification data"""
        qualification_list = []

        while True:
            qualification_data = {}
            
            userinput = int(input("Do you want to add qualification?(1:yes || 2:no): "))

            if userinput == 1:
                qualification_data["Qualification_name"] = input("Enter your qualification name: ")

                qualification_data["Passing year"] = None
                while True:
                    self.passing_year = input("Enter your passing year: ")
                    if self.passing_year.isdigit():
                        if len(self.passing_year) == 4:
                            qualification_data["Passing year"] = self.passing_year
                            break
                        else:
                            print("Invalid passing year.")
                    else:
                        print("Only numbers are allowed.")        
                qualification_list.append(qualification_data)
            elif userinput == 2:
                break
            else:
                print("Invalid input. Enter either 1 or 2.")

        return qualification_list
    
class display(registration):
    def display_student_data(self):
        """Display registered student data in JSON format"""
        print(json.dumps(self.students_data,indent=4))

class main_menu(display):
    def menu(self):
        """Display the main menu options"""
        print("Enter 1 for Registration.")
        print("Enter 2 for Display data.")
        print("Enter 3 for Exit.")        

    def option(self):
        """Handles user input and executes accordingly"""
        while True:
            userinput = int(input("Enter any number(Either 1, 2 or 3): "))
            if userinput == 1:
                self.School_student_registration()
                
            elif userinput == 2:
                self.display_student_data()
            
            elif userinput == 3:
                print("Goodbye!!")
                break 

            else:
                print("Invalid Number.Enter either 1, 2 or 3.")       
                        

obj = main_menu()
obj.menu()
obj.option()