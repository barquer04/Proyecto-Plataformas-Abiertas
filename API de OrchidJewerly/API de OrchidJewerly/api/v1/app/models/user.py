from bson.objectid import ObjectId
from app import mongo

class UserModel:
    @staticmethod
    def obtener_todos():
        users_cursor = mongo.db.users.find()
        users = []
        for user in users_cursor:
            user["_id"] = str(user["_id"])
            users.append(user)
        return users

    @staticmethod
    def obtener_por_id(id):
        try:
            user = mongo.db.users.find_one({"_id": ObjectId(id)})
            if user:
                user["_id"] = str(user["_id"])
            return user
        except:
            return None

    @staticmethod
    def crear(data):
        return mongo.db.users.insert_one(data).inserted_id

    @staticmethod
    def actualizar(id, data):
        try:
            result = mongo.db.users.update_one(
                {"_id": ObjectId(id)},
                {"$set": data}
            )
            return result.matched_count
        except:
            return -1

    @staticmethod
    def eliminar(id):
        try:
            result = mongo.db.users.delete_one({"_id": ObjectId(id)})
            return result.deleted_count
        except:
            return -1

    @staticmethod
    def login(username, password):
        print("login", username, password)
        try:
            user = mongo.db.users.find_one({
                "username": username,
                "password": password
            })
            print("user --: ", user)
            if user:
                user["_id"] = str(user["_id"])
            print("Login exitoso")
            return user
        except:
            return None