class Student():
    def School_name(self):
        print("Indixpert")

    def Standard(self):
        print("B.tech")

class Student1(Student):
    def __init__(self,name,age):

        self.name = name
        self.age = age

obj = Student1("Kaushik",20)

obj.School_name()
obj.Standard()
print(obj.name)
print(obj.age)
