from flask import Blueprint, request, jsonify
from app.models.ropa import RopaModel

ropa_endpoint = Blueprint('ropa_endpoint', __name__)

@ropa_endpoint.route('/prendas', methods=['GET'])
def obtener_prendas():
    id_prenda = request.args.get('id')
    if id_prenda:
        prenda = RopaModel.obtener_por_id(id_prenda)
        if prenda:
            return jsonify(prenda), 200
        return jsonify({"error": "Prenda no encontrada"}), 404

    prendas = RopaModel.obtener_todas()
    return jsonify(prendas), 200
