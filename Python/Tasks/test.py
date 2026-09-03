import json
import os

students = []
counter = 0

while True:
    print("==========================================================")
    print(" Menu:")
    print("1. Enter student data")
    print("2. Display all student records")
    print("3. For searching the data using mobile number")
    print("4. Exit")
    choice = input("Enter your choice (1/2/3/4): ")

    if choice == "1":
        num_students = int(input("Enter the number of students: "))

        for i in range(num_students):
            print("\nEnter details for student:")
            student_id = int(input("Enter student ID: "))
            name = input("Enter student name: ")
            age = int(input("Enter student age: "))
            grade = input("Enter student grade: ")
            phone_number = int(input("Enter your mobile number: "))

            qualifications = []  # Reset qualifications for each student
            while True:
                userinput = int(input("Do you want to add qualification (1: Yes || 0: No): "))
                if userinput == 1:
                    education = {
                        "Qualification name": input("Enter your qualification: "),
                        "Passing year": int(input("Enter your passing year: "))
                    }
                    qualifications.append(education)
                else:
                    break

            students.append({
                'Student ID': student_id,
                'Name': name,
                'Age': age,
                'Grade': grade,
                'phone number': phone_number,
                'qualification': qualifications
            })
            counter = 1

    elif choice == "2":
        if counter == 0:
            print("The list is empty.")
        else:
            path = os.getcwd() + "\\jsondata.json"
            with open(path, "w") as f:
                json.dump(students, f, indent=4)
            print("The JSON file is created at:", path)

    elif choice == "3":
        if counter == 0:
            print("No data available. Please enter student data first.")
        else:
            path = os.getcwd() + "\\jsondata.json"
            with open(path, "r") as f:
                data = json.load(f)

            userchoice = int(input("Enter the mobile number you want to search: "))
            found = False
            for student in data:
                if student["phone number"] == userchoice:
                    print("Student found:", student)
                    found = True
                    break
            if not found:
                print("No student found with this mobile number.")

    elif choice == "4":
        print("\nExiting program. Goodbye!")
        break

    else:
        print("\nInvalid choice. Please enter 1, 2, 3, or 4.")
