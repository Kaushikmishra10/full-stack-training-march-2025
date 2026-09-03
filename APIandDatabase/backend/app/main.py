from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import json
import os

my_api = FastAPI()

# ---- File path jahan data store hoga ----
DATA_FILE = "db/users.json"

# ---- Data Model ----
class User(BaseModel):
    id: int
    name: str
    email: str
    age: Optional[int] = None

# ---- Helper: JSON file se data read karna ----
def read_users():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)

# ---- Helper: JSON file mein data write karna ----
def write_users(users):
    with open(DATA_FILE, "w") as f:
        json.dump(users, f, indent=4)

# ---- GET: sabhi users ----
@my_api.get("/users")
def get_all_users():
    return read_users()

# ---- GET: ek specific user by ID ----
@my_api.get("/users/{user_id}")
def get_user(user_id: int):    
    users = read_users()
    for user in users:
        if user["id"] == user_id:
            return user
    raise HTTPException(status_code=404, detail="User not found")

# ---- POST: naya user add karo ----
@my_api.post("/users")
def create_user(user: User):
    users = read_users()

    # Duplicate ID check
    for existing in users:
        if existing["id"] == user.id:
            raise HTTPException(status_code=400, detail="User ID already exists")

    users.append(user.model_dump())
    write_users(users)
    return {"message": "User created successfully", "user": user}