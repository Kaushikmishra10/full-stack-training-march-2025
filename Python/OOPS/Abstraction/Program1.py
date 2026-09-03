from abc import ABC,abstractmethod
import time

class Shape(ABC):
    @abstractmethod
    def Area(self):
        pass

class Circle(Shape):
    PI = 3.14
    def Area(self,r=0,area=0):
        print("Circle")
        r = float(input("Enter any number: "))
        area = self.PI*r*r
        print("Wait.........")
        time.sleep(1)
        print(f"Area of Circle is {area}")
        print("=================================")

class Rectangle(Shape):
    def Area(self,l=0,b=0,area=0):
        time.sleep(1)
        print("Rectangle")      
        l = float(input("Enter any number: "))
        b = float(input("Enter any number: "))
        area = l*b
        print("Wait......")
        time.sleep(1)
        print(f"Area of Rectangle is {area}")

ob = Circle()
ob.Area()

ob1 = Rectangle()
ob1.Area()  

           