path = r"C:\Kaushik Mishra\Python files\logical filehandling"

userinput1 = input("Please enter your name: ")

while True:
    userinput2 = int(input("Please enter the number of files: "))
    if userinput2 > 100:
        print("Number limit error(only upto 100)") 
    else:
        break       
 
completepath=path+r"\\"+userinput1

for n in range(1,userinput2+1):

    with open(f"{completepath}_{n}.txt","w") as f:
        f.write(f"This is {userinput1} {n} file....") 

print("File Successfully Created")
 