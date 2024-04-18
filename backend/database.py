import pymongo

# user model
class User:
    def __init__(self, db):
        self.collection = db['users']

    def create_user(self, user_data):
        self.collection.insert_one(user_data)

    def user_exists(self, email=None, username=None):
        query = {}
        if email:
            query["email"] = email
        if username:
            query["username"] = username
        return self.collection.find_one(query) is not None

    def get_user_by_name(self,user_name):
        return self.collection.find_one({"username":user_name})

    def get_user_by_id(self, user_id):
        return self.collection.find_one({"_id": user_id})

    def update_user(self, user_id, new_data):
        self.collection.update_one({"_id": user_id}, {"$set": new_data})

    def delete_user(self, user_id):
        self.collection.delete_one({"_id": user_id})


# Disease Class
class Disease:
    def __init__(self, db):
        self.collection = db['diseases']

    def create_disease(self, disease_data):
        self.collection.insert_one(disease_data)

    def get_disease_by_name(self, disease_name):
        return self.collection.find_one({"name": disease_name})

    def update_disease(self, disease_name, new_data):
        self.collection.update_one({"name": disease_name}, {"$set": new_data})

    def delete_disease(self, disease_name):
        self.collection.delete_one({"name": disease_name})

# connect to MongoDB
try:
    client = pymongo.MongoClient("mongodb+srv://designerud28:*2021qwe@merncluster.8brpy3t.mongodb.net/")
    db = client["TomatoDB"]
    # create user collection
    user_model = User(db)

    # create disease collection
    disease_model = Disease(db)

    print("database connected")

except:
    print("failed to connect the database")




