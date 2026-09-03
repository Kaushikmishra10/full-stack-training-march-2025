

path = r"C:\Kaushik Mishra\Python files\logical filehandling"

Name = input("Please enter your name: ")
location = input("Please enter your address: ")
study = input("Please enter your pursuing course: ")
Aim = input("What you want to become?: ")

filename = input("Please enter the name of files: ")

with open(f"{path}\\{filename}.txt","w") as f:
    f.write(f"\nMy name is {Name}")
    f.write(f"\nMy address is {location}")
    f.write(f"\nI am doing {study}")
    f.write(f"\nI want to become {Aim}") 

print("Processing..........")


print("File Successfully Created")
  