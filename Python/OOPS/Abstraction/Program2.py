from abc import ABC,abstractmethod

class Calculation(ABC):
    @abstractmethod
    def Value(self,x):
        #self.x = x
        print("Value of X is: ",x)

    def name(self,your_name=0):
        your_name = input("Enter your name: ")
        print("Your name is: ",your_name)   

class Testing(Calculation):
    def Value(self):
        print("Value accepted.")

class Example(Calculation):
    def Value(self):
        print("Value printed.")


obj = Testing()
obj.Value()
obj.name()

           




