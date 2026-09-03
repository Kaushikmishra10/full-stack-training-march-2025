class Book:

    def __init__(self,Title="Object Oriented Programming",Author = "Alan kay",Year_published = 1960):
        self.Title = Title
        self.Author = Author
        self.Year_published = Year_published
        

    def display_info(self):
        print("Title: ",self.Title)
        print("Author: ",self.Author)
        print("Year Published: ",self.Year_published)

    def update_year(self,newvalue):
        self.Year_published = newvalue
           

obj = Book()
obj.display_info()
obj.update_year(2000)
obj.display_info()
         