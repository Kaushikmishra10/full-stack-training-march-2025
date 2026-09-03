class College:
    def __init__(self, cllg_name):
        self.cllg_name = cllg_name
    def cllg_name(self):
        print("KIIT College")    

class Student(College):
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def display(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")

s1 = Student("Kaushik", 20)
s1.cllg_name()
s1.display()        
             