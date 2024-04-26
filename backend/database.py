import pymongo
from model import class_labels
from bson import ObjectId

# user model
class User:
    def __init__(self, db):
        self.collection = db['users']

    def create_user(self, user_data):
        self.collection.insert_one(user_data)

    def user_exists(self, email=None, username=None):

        if email==None:
            email = ''
        if username==None:
            username = ''
        print({"$or":[{"email":email},{"username":username}]})
        return self.collection.find_one({"$or":[{"email":email},{"username":username}]}) is not None

    def get_user_by_name(self,user_name):
        return self.collection.find_one({"username":user_name})

    def get_user_by_id(self, user_id):
        return self.collection.find_one(ObjectId(user_id))

    def update_user(self, user_id, new_data):
        print(new_data)
        self.collection.find_one_and_update({"_id": ObjectId(user_id)}, {"$set": new_data})

    def delete_user(self, user_id):
        self.collection.delete_one({"_id": user_id})


class SearchHistory:
    def __init__(self, db):
        self.collection = db['searchhistory']

    def insert_search(self,disease_class,confidence_level,time,img_id,user_id):
        hist_dict = {
            "disease_class":disease_class,
            "confidence":confidence_level,
            "time":time,
            "img_path":"uploads/"+img_id,
            "user_id" : user_id
        }
        self.collection.insert_one(hist_dict)

    def get_a_search(self,search_id):
        return self.collection.find_one({"_id": search_id})

    def get_all_search(self,user_id):
        return self.collection.find({"user_id":user_id})




# Disease Class
class Disease:
    def __init__(self, db):
        self.collection = db['diseases']

    def create_disease(self, disease_data):
        self.collection.insert_one(disease_data)

    def get_disease_by_name(self, disease_name):
        return self.collection.find_one({"disease": disease_name})

    def update_disease(self, disease_name, new_data):
        self.collection.update_one({"name": disease_name}, {"$set": new_data})

    def delete_disease(self, disease_name):
        self.collection.delete_one({"name": disease_name})

# connect to MongoDB
try:
    client = pymongo.MongoClient("mongodb+srv://akash:akash123@cluster0.24bmwfn.mongodb.net/")
    db = client["TomatoDB"]
    # create user collection
    user_model = User(db)

    # create disease collection
    disease_model = Disease(db)


    # create search history
    search_history_model = SearchHistory(db)

    print("database connected")

except Exception as e:

    print("failed to connect the database")




