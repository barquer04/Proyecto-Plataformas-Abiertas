from bson.objectid import ObjectId
from app import mongo

class UsuarioModel:
    @staticmethod
    def obtener_todos():
        usuarios = mongo.db.usuarios.find()
        return [{**u, "_id": str(u["_id"])} for u in usuarios]

    @staticmethod
    def obtener_por_id(id):
        try:
            usuario = mongo.db.usuarios.find_one({"_id": ObjectId(id)})
            if usuario:
                usuario["_id"] = str(usuario["_id"])
            return usuario
        except:
            return None
