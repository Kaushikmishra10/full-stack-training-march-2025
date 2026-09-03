class student:

    def __init__(self,id,name,address,contact,age,Student_discount):
        self.id = id
        self.name = name
        self.address = address
        self.contact = contact
        self.age = age
        if Student_discount == 8400:
            self.__offer = "Applied"
        else:
            self.__offer = "NA"


    def display(self):
        print("Available discount: ",self.__offer)


obj = student("01","Kaushik","Ayodhya","8400491135","20",12345)
print("Id: ",obj.id)
print("Name: ",obj.name)
print("Address: ",obj.address)
print("Contact: ",obj.contact)
print("Age: ",obj.age)
obj.display()