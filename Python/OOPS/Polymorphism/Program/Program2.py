class Bird:
    def intro(self):
        print("There are different types of birds.")

    def fly(self):
        print("most of the birds can fly but some cannot.") 

class Parrot(Bird):
    def fly(self):
        print("Parrots can fly.")

class Penguin(Bird):
    def fly(self):
        print("Penguin canot fly.")

obj1 = Bird()
obj2 = Parrot()
obj3 = Penguin()

obj1.intro()
obj1.fly()

obj2.intro()
obj2.fly()

obj3.intro()
obj3.fly()


