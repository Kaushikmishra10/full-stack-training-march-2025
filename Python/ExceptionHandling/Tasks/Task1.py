import os
import json
 
def register():

    list = []
    
    Id = None
    while True:
        id = input("Enter your Student id: ")
        if not id.isdigit():
            print("Only numbers are allowed.") 
        else:
            Id = int(id)
            break    
    
    Name = None
    while True:
        name = input("Enter your name: ")
        if not name.isalpha():
            print("Only character values are allowed.")
        else:
            Name = name
            break    
    
    Address = None
    while True:
        address = input("Enter your address: ")
        if not address.isalpha():
            print("Only character values are allowed.")
        else:
            Address = address
            break    
    
    Contact_number = None
    while True:
        number = input("Enter your number: ")
        if not number.isdigit():
            print("Only characters are allowed.")
        else:
            if len(number) != 10:
                print("Incomplete contact number.")
            else:    
                Contact_number = number
                break    
           
    list.append({
        "Student id":Id,
        "Name":Name,
        "Address":Address,
        "Contact number": Contact_number

    })
     
    path = os.getcwd() + "\\data.json"
    with open(path, "w") as file:
            file.write(json.dumps(list, indent=4))            

def manage(): 
    try:
        register()

    except Exception as error:
        print("Log : ",error)    

    finally:
        print("========================================")
        print("(: Welcome to INDIXPERT :) ")
        print("========================================")

manage()   



import uuid

def generate_unique_id():
    return str(uuid.uuid4())  # Generates a random unique ID

# Example usage
unique_id = generate_unique_id()
print("Generated Unique ID:", unique_id)

import random
import time

def generate_unique_id():
    timestamp = int(time.time() * 1000)  # Milliseconds since epoch
    random_part = random.randint(100, 999)  # 3-digit random number
    unique_id = str(timestamp)[-8:] + str(random_part)  # Ensuring 11 digits
    return unique_id

# Example usage
unique_id = generate_unique_id()
print("Generated Unique ID:", unique_id)

import uuid
import random
import string

def generate_unique_id():
    unique_part = uuid.uuid4().int  # Generate a large unique number
    base_chars = string.ascii_uppercase + string.digits  # Alphanumeric uppercase
    random_part = ''.join(random.choices(base_chars, k=3))  # 3 random characters
    unique_id = str(base36_encode(unique_part))[:8] + random_part  # Ensure 11 characters
    return unique_id.upper()

def base36_encode(number):
    """Encodes a number in base36 (alphanumeric format)."""
    chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    result = ''
    while number:
        number, i = divmod(number, 36)
        result = chars[i] + result
    return result or '0'

# Example usage
unique_id = generate_unique_id()
print("Generated Unique Alphanumeric ID:", unique_id)

# import uuid
# print(str(uuid.uuid4())[0:11])
# abf0598a-9d
# 448e7d29-c2