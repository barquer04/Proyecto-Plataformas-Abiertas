from flask import Blueprint, request, jsonify
from app.models.user import UserModel

# Creamos el blueprint
users_endpoints = Blueprint('users_endpoints', __name__)

# ============================
# POST login de usuario
# ============================
@users_endpoints.route("/users/login", methods=["POST"])
def login_user():
    data = request.get_json()

    if not data or not data.get("username") or not data.get("password"):
        return jsonify({"error": "Faltan credenciales"}), 400

    user = UserModel.login(data["username"], data["password"])
    if user:
        return jsonify({"mensaje": "Login exitoso", "usuario": user}), 200
    return jsonify({"error": "Credenciales inválidas"}), 401

# ============================
# POST registrar usuario
# ============================
@users_endpoints.route('/users/register', methods=['POST'])
def register_user():
    data = request.get_json()

    if not data or not data.get("username") or not data.get("password"):
        return jsonify({"error": "Datos incompletos"}), 400

    nuevo_usuario = {
        "username": data["username"],
        "password": data["password"],  # OJO: deberías encriptar la contraseña
        "email": data.get("email"),
        "fullname": data.get("fullname")
    }

    user = UserModel.registrar(nuevo_usuario)
    if user:
        return jsonify({"mensaje": "Usuario registrado exitosamente", "usuario": user}), 201
    return jsonify({"error": "No se pudo registrar el usuario"}), 400

# ============================
# GET todos los usuarios
# ============================
@users_endpoints.route('/users', methods=['GET'])
def obtener_usuarios():
    users = UserModel.obtener_todos()
    return jsonify(users), 200

# ============================
# GET usuario por ID
# ============================
@users_endpoints.route('/users/<id>', methods=['GET'])
def obtener_usuario(id):
    user = UserModel.obtener_por_id(id)
    if user:
        return jsonify(user), 200
    return jsonify({"error": "Usuario no encontrado"}), 404

# ============================
# PUT actualizar usuario
# ============================
@users_endpoints.route('/users/<id>', methods=['PUT'])
def actualizar_usuario(id):
    data = request.get_json()
    actualizado = UserModel.actualizar(id, data)
    if actualizado:
        return jsonify({"mensaje": "Usuario actualizado correctamente"}), 200
    return jsonify({"error": "No se pudo actualizar el usuario"}), 400

# ============================
# DELETE eliminar usuario
# ============================
@users_endpoints.route('/users/<id>', methods=['DELETE'])
def eliminar_usuario(id):
    eliminado = UserModel.eliminar(id)
    if eliminado:
        return jsonify({"mensaje": "Usuario eliminado correctamente"}), 200
    return jsonify({"error": "No se pudo eliminar el usuario"}), 400
