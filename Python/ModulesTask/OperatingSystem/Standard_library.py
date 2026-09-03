### CURRENT DATE AND TIME ###

# import datetime
# now = datetime.datetime.now()
# print("current date and time is: ",now)

### SPECIFIC DATE AND TIME ###

# import datetime
# specific_date = datetime.datetime(2024,6,10,5,45)
# print("specific date and time is: ",specific_date)


### ADDING DATE AND TIME IN CURRENT DATE AND TIME ###

# import datetime
# now = datetime.datetime.now()
# wanted_date = now + datetime.timedelta(days=7)
# print("After one week date and time is:",wanted_date)

### FORMATTING OF DATE AND TIME ACCORDING TO YOU ###

# import datetime
# now = datetime.datetime.now()
# print("Current date and time is: ",now)
# formatted_date = now.strftime("%d/%m/%Y  %H:%M:%S")
# print("The formatted date and time is: ",formatted_date)

### SHOWING A EPOCH TIMING OF CURRENT ###

# import time
# current_time = time.time()
# print("Current time(seconds since epoch): ",current_time) 

### PAUSING A TIME FOR A WHILE ###

# import time
# print("Hello.....")
# time.sleep(5)
# print("Time up...")

### DISPLAY A CALENDER ###

# import calendar
# print(calendar.calendar(2024))

### DISPALYING A SPECIFIC MONTH ###

# import calendar
# print(calendar.month(2024,12))

### CHECKING A LEAP YEAR ###

# import calendar
# is_leap = calendar.isleap(2024)
# print("Is 2024 is leap year?: ",is_leap)

### NUMBER OF DAYS IN A MONTH ###

# import calendar
# days_in_month = calendar.monthrange(2024,6)
# print("Number of days is: ",days_in_month[1])

##### OPERATING SYSTEM(OS) #####

### FIND A CURRENT WORKING DIRECTORY ###

# import os
# cwd = os.getcwd()
# print("Current working directory is: ",cwd) 

### LISTING FILES IN A DIRECTORY ###

# import os
# cwd = os.getcwd()
# print("Current working directory is: ",cwd)
# files = os.listdir(cwd)
# print("Files in current directory is: ",files) 

### CREATING A DIRECTORY ###

# import os
# import time
# os.mkdir("Kaushik")
# print("created 'Kaushik'")

# time.sleep(4)

# os.rmdir("Kaushik")
# print("Removed 'Kaushik'")

### We delete directory only when it is created first we have to create it then we remove it..we use time sleep function 
# to show that how a directory is created and after creation how it will remove... 