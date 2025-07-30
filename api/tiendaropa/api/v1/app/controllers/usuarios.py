from flask import Blueprint, request, jsonify
from app.models.usuario import UsuarioModel

usuarios_endpoint = Blueprint('usuarios_endpoint', __name__)

@usuarios_endpoint.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    id_usuario = request.args.get('id')
    if id_usuario:
        usuario = UsuarioModel.obtener_por_id(id_usuario)
        if usuario:
            return jsonify(usuario), 200
        return jsonify({"error": "Usuario no encontrado"}), 404

    usuarios = UsuarioModel.obtener_todos()
    return jsonify(usuarios), 200
