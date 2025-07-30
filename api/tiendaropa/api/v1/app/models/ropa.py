from bson.objectid import ObjectId
from app import mongo

class RopaModel:
    @staticmethod
    def obtener_todas():
        prendas = mongo.db.prendas.find()
        return [{**p, "_id": str(p["_id"])} for p in prendas]

    @staticmethod
    def obtener_por_id(id):
        try:
            prenda = mongo.db.prendas.find_one({"_id": ObjectId(id)})
            if prenda:
                prenda["_id"] = str(prenda["_id"])
            return prenda
        except:
            return None
