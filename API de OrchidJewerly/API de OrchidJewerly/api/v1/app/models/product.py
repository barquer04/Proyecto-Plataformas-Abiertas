from bson.objectid import ObjectId
from app import mongo

class ProductModel:
    @staticmethod
    def obtener_todos():
        print(mongo.db.list_collection_names())
        products_cursor = mongo.db.products.find()
        products = []
        for product in products_cursor:
            product["_id"] = str(product["_id"])
            products.append(product)
        return products

    @staticmethod
    def obtener_por_id(id):
        try:
            product = mongo.db.products.find_one({"_id": ObjectId(id)})
            if product:
                product["_id"] = str(product["_id"])
            return product
        except:
            return None

    @staticmethod
    def crear(data):
        return mongo.db.products.insert_one(data).inserted_id

    @staticmethod
    def actualizar(id, data):
        try:
            result = mongo.db.products.update_one(
                {"_id": ObjectId(id)},
                {"$set": data}
            )
            return result.matched_count
        except:
            return -1

    @staticmethod
    def eliminar(id):
        try:
            result = mongo.db.products.delete_one({"_id": ObjectId(id)})
            return result.deleted_count
        except:
            return -1