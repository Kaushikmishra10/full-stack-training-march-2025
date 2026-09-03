class Person:
    def person_info(self,name,age):
        print(f"Name: {name} and Age: {age}")

class Company:
    def company_info(self,companyname,work):
        print(f"Comapny Name: {companyname} and Work: {work}")

class Employee(Person,Company):
    pass

obj = Employee()
obj.person_info("Kaushik",20)
obj.company_info("Google","IT")

            