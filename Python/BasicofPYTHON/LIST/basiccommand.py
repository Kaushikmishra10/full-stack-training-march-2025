##########  LIST  ##########
# It is a data structure in python that is a mutable. Lists are defined by having values in square brackets. 

# CREATION OF LIST

my_list = []
my_list = ["pineapple","Banana","Apple","Mango"]

print(my_list)

# ACCESSING ITEMS IN LIST

print(my_list[0])
print(my_list[1])
print(my_list[2])

# CHANGING ITEMS IN LIST

my_list[2] = "Cherry"
print(my_list)

# ADDING ELEMENT IN LIST

my_list.append("Papaya")
print(my_list)

# REMOVING ITEMS FROM LIST THROUGH REMOVE KEYWORD

my_list.remove("Mango")
print(my_list)

# REMOVING THROUGH POP OPERATION

my_list.pop(0)
print(my_list)

# FIND LENGTH OF LIST

print(len(my_list))

# SORT THE LIST IN ASCENDING ORDER

my_list.sort()
print(my_list)

# COPY OF A LIST

b = my_list.copy()
print(b)