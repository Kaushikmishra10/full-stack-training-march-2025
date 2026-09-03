class Calculation:
    def __init__(self,firstnumber,secondnumber):
        self.__firstnumber = firstnumber
        self.__secondnumber = secondnumber

    def addition(self):
        return self.__firstnumber + self.__secondnumber

    def subtraction(self):
        return self.__firstnumber - self.__secondnumber

    def multiplication(self):
        return self.__firstnumber * self.__secondnumber

    def division(self):
        return self.__firstnumber / self.__secondnumber    


obj = Calculation(10,20)
print(obj.addition())
print(obj.subtraction())
print(obj.multiplication())
print(obj.division())