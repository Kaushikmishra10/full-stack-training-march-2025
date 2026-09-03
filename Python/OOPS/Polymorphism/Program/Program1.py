class Shape:
    def Area(self):
        pass

class Circle(Shape):
    PI= 3.14
    def Area(self,r=0,area=0):
        self.r = r
        self.area = area
        r = int(input("Enter any number: "))
        area = self.PI*r*r
        print(f"Area of Circle: {area}")

class Square(Shape):
    def Area(self,a=0,area=0):
        self.a = a
        self.area = area
        a = int(input("Enter any number: "))
        area = a*a
        print(f"Area of Square: {area}")
        
while True:
    Userinput=int(input("Enter your choice(1=Circle or 2=Square or 3=Exit): "))

    if Userinput == 1:
        ob=Circle()
        ob.Area()

    elif Userinput == 2:
        ob1=Square()
        ob1.Area()

    elif Userinput == 3:
        print("Goodbyee!!!!")
        break

    else:
        print("Invalid number. Choose either 1, 2, or 3.")          



        

               
