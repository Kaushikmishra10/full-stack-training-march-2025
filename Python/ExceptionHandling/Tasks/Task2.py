import datetime
import os
import uuid
import json

date = datetime.datetime.now().strftime("%Y-%m-%d") + ".txt"
path = os.getcwd() + "\\data.json"

user_input = input("In which file you want to store data (json // txt): ").lower()

if user_input == "txt": 
    if os.path.exists(date):
        with open(date, "a") as f:
            f.write("Data appended to the file.\n")
    else:
        with open(date, "w") as f:
            f.write("File created and initial content added.\n")
        print(f"File '{date}' created successfully.")

    try:
        for i in range(2):
            with open(date, "a") as f:

                Id = str(uuid.uuid4())[0:11]
                print(Id)    

                while True:
                    Name = input("Enter your name: ")
                    if not Name.isalpha():
                        print("ERROR: Only character values are allowed.")
                    else:
                        break

                while True:        
                    Email_id = input("Enter your email address: ")
                    if "@gmail.com" not in Email_id:
                        print("ERROR: Wrong email id.")
                    else:
                        break 

                while True:     
                    Contact_number = input("Enter your contact number: ")
                    if not Contact_number.isdigit():
                        print("ERROR: Number must be in digits.")
                    elif len(Contact_number) != 10:
                        print("ERROR: Incorrect mobile number.")
                    else: 
                        break        
                    
                f.write(f"INFO: StudentID: {Id}, Name: {Name}, Email: {Email_id}, Contact: {Contact_number}, Date: {datetime.datetime.now()}\n")
                f.write("========================================\n")
                print("User data appended successfully.")

    except Exception as e:
        with open(date, "a") as f:
            f.write(f"log: Error occurred: {e}, Date: {datetime.datetime.now()}\n") 
            f.write("========================================\n")
        print(f"An error occurred: {e}")
    finally:
        print("Welcome to Indixpert")

elif user_input == "json":
    
    if not os.path.exists(path):
        with open(path, "w") as f:
            json.dump([],f)  
        print(f"File '{path}' created successfully.") 

    try:
        with open(path, "r") as f:
            try:
                data = json.load(f)  
            except Exception as e:
                data = [] 

        for i in range(1):

            Id = str(uuid.uuid4())[0:11]
            print(Id)

            while True:
                Name = input("Enter your name: ")
                if not Name.isalpha():
                    print("ERROR: Only character values are allowed.")
                else:
                    break

            while True:        
                Email_id = input("Enter your email address: ")
                if "@gmail.com" not in Email_id:
                    print("ERROR: Wrong email id.")
                else:
                    break 

            while True:     
                Contact_number = input("Enter your contact number: ")
                if not Contact_number.isdigit():
                    print("ERROR: Number must be in digits.")
                elif len(Contact_number) != 10:
                    print("ERROR: The length of the mobile number must be 10 digits.")
                else: 
                    break        

            new_entry = {
                "Student ID": Id,
                "Name": Name,
                "Email ID": Email_id,
                "Contact Number": Contact_number,
                "Date": datetime.datetime.now().strftime("%Y-%m-%d")
            }
            data.append(new_entry) 

        with open(path, "w") as f:
            json.dump(data, f, indent=4)

        print("User data appended successfully.")

    except Exception as e:
        with open(date, "a") as f:
            f.write(f"log: Error occurred: {e}, Date: {datetime.datetime.now()}\n")
            f.write("========================================\n")
        print(f"An error occurred: {e}")

    finally:
        print("Welcome to Indixpert")

else:
    print("Invalid input. Please choose either 'json' or 'txt'.")
