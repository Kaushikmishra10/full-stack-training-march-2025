# dictdata=[{"id":1,"name":"kaushik","address":"gurgaon"},{"id":2,"name":"tabish","address":"bihar"}]

# x = int(input("enter your id to search: "))

# for d in dictdata:
#     if d["id"] == x:
#         print(d)

        

# Data = [
#     {"id":1,"Name":"Kaushik","Education":[{"qualification":"10th","passingyear":2020},{"qualification":"12th","passingyear":2022},{"qualification":"Btech","passingyear":2027}]},
#     {"id":2,"Name":"Tabish","Education":[{"qualification":"10th","passingyear":2022},{"qualification":"12th","passingyear":2024},{"qualification":"B.com","passingyear":2026}]},
#     {"id":3,"Name":"Sumit","Education":[{"qualification":"10th","passingyear":2019},{"qualification":"12th","passingyear":2021},{"qualification":"Btech","passingyear":2025}]},
#     {"id":4,"Name":"Yash","Education":[{"qualification":"10th","passingyear":2020}]}
# ]

# for d in Data:
#     for y in d["Education"]:
#         if y["qualification"] == "Btech":
#             print(d["id"])


# Data = [
#     {"id":1,"Name":"Kaushik","Education":[{"qualification":"10th","passingyear":"2020"},{"qualification":"12th","passingyear":"2022"},{"qualification":"Btech","passingyear":"2027"}]},
#     {"id":2,"Name":"Tabish","Education":[{"qualification":"10th","passingyear":"2022"},{"qualification":"12th","passingyear":"2024"},{"qualification":"B.com","passingyear":"2026"}]},
#     {"id":3,"Name":"Sumit","Education":[{"qualification":"10th","passingyear":"2019"},{"qualification":"12th","passingyear":"2021"},{"qualification":"Btech","passingyear":"2025"}]},
#     {"id":4,"Name":"Yash","Education":[{"qualification":"10th","passingyear":"2020"}]}
# ]

# userinput = input("Enter your passing year: ")

# for d in Data:
#     for y in d["Education"]:
#         if y["passingyear"] == userinput:
#             print(d["id"])
        
# print("Forward is: ")
# for d in range(1,51):
#     print(d)

# print("Reverse is: ")    
# for d in range(50,0,-1):
#     print(d) 


# num = [10,20,1,2,3,4,5]
# num.sort()
# print(num)
# num.reverse()
# print(num)  




# names = []
# for i in range(0,10):
#     name = input("enter name:")
#     names.append(name)

# for name in names:
#     print(name)

# print("The reverse of names is: ")
# for name in reversed(names):
#     print(name)   


import json
import os

# Define the file path for storing student data
file_path = os.getcwd() + "\\jsondata.json"

# Load existing data from the file (if it exists)
if os.path.exists(file_path):
    with open(file_path, "r") as file:
        students = json.load(file)
else:
    students = []

while True:
    print("==========================================================")
    print(" Menu:")
    print("1. Enter student data")
    print("2. Display all student records")
    print("3. Search data by mobile number")
    print("4. Search data by qualification")
    print("5. Exit")
    choice = input("Enter your choice (1/2/3/4/5): ")

    if choice == "1":
        print("\nEnter details for student:")
        student_id = int(input("Enter student ID: "))
        name = input("Enter student name: ")
        age = int(input("Enter student age: "))
        grade = input("Enter student grade: ")
        phone_number = input("Enter your mobile number: ")  # Changed to string

        qualifications = []
        while True:
            user_input = int(input("Do you want to add qualification (1: Yes || 0: No): "))
            if user_input == 1:
                education = {
                    "Qualification name": input("Enter your qualification: "),
                    "Passing year": int(input("Enter your passing year: "))
                }
                qualifications.append(education)
            else:
                break

        # Add the new student record to the list
        students.append({
            'Student ID': student_id,
            'Name': name,
            'Age': age,
            'Grade': grade,
            'Phone Number': phone_number,
            'Qualification': qualifications
        })

        # Write the updated list to the file
        with open(file_path, "w") as file:
            json.dump(students, file, indent=4)
        print("Student data saved successfully!")

    elif choice == "2":
        if not students:
            print("No records available.")
        else:
            print("\nStudent Records:")
            for student in students:
                print(json.dumps(student, indent=4))

    elif choice == "3":
        if not students:
            print("No data is available.")
        else:
            search_number = input("Enter the mobile number you want to search: ")
            found = False
            for student in students:
                if student["Phone Number"] == search_number:
                    print("Student found:", json.dumps(student, indent=4))
                    found = True
                    break
            if not found:
                print("No student found with this number.")

    elif choice == "4":
        if not students:
            print("No data is available.")
        else:
            search_qualification = input("Enter the qualification you want to search: ")
            found = False
            for student in students:
                for qualify in student["Qualification"]:
                    if qualify["Qualification name"].lower() == search_qualification.lower():
                        print("Student found:", json.dumps(student, indent=4))
                        found = True
                        break
            if not found:
                print("No student found with this qualification.")

    elif choice == "5":
        print("\nExiting program. Goodbye!")
        break

    else:
        print("\nInvalid choice. Please enter 1, 2, 3, 4, or 5.")



