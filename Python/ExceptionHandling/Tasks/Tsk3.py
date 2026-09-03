class Student:
    def __init__(self, name, age):
        self.__name = name
        self.__age = age
        
    def get_data(self):
        return self.__name, self.__age

    def display(self):
        print(f"Name: {self.__name}")    
        print(f"Age: {self.__age}")    


s1 = Student("Kaushik", 20)

s1.display()
