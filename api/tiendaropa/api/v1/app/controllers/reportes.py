from flask import Blueprint, jsonify
from app import mongo

reportes_endpoint = Blueprint('reportes_endpoint', __name__)

# 1. Marcas con al menos una venta
@reportes_endpoint.route('/reportes/marcas-con-ventas', methods=['GET'])
def marcas_con_ventas():
    marcas = mongo.db.ventas.distinct("marca")
    return jsonify(marcas), 200

# 2. Prendas vendidas + stock actual
@reportes_endpoint.route('/reportes/prendas-vendidas', methods=['GET'])
def prendas_vendidas():
    resultado = list(mongo.db.ventas.aggregate([
        {
            "$lookup": {
                "from": "prendas",
                "localField": "prenda",
                "foreignField": "nombre",
                "as": "info_prenda"
            }
        },
        {"$unwind": "$info_prenda"},
        {
            "$group": {
                "_id": "$prenda",
                "totalVendidas": {"$sum": "$cantidad"},
                "stockActual": {"$first": "$info_prenda.stock"}
            }
        }
    ]))
    return jsonify(resultado), 200

# 3. Top 5 marcas más vendidas
@reportes_endpoint.route('/reportes/top-marcas', methods=['GET'])
def top_marcas():
    resultado = list(mongo.db.ventas.aggregate([
        {"$group": {
            "_id": "$marca",
            "totalVentas": {"$sum": "$cantidad"}
        }},
        {"$sort": {"totalVentas": -1}},
        {"$limit": 5}
    ]))
    return jsonify(resultado), 200
