from flask import Blueprint, request, jsonify
from app.models.product import ProductModel

# Creamos el blueprint
products_endpoints = Blueprint('products_endpoints', __name__)

# ============================
# GET todos los productos
# ============================
@products_endpoints.route('/products', methods=['GET'])
def obtener_products():
    products = ProductModel.obtener_todos()
    return jsonify(products), 200

# ============================
# GET producto por ID
# ============================
@products_endpoints.route('/products/<id>', methods=['GET'])
def obtener_product(id):
    product = ProductModel.obtener_por_id(id)
    if product:
        return jsonify(product), 200
    return jsonify({"error": "Producto no encontrado o ID inválido"}), 404

# ============================
# POST crear producto
# ============================
@products_endpoints.route('/products', methods=['POST'])
def crear_product():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos inválidos"}), 400

    nuevo_producto = {
        "name": data.get("name"),
        "description": data.get("description"),
        "price": data.get("price"),
        "stock": data.get("stock"),
        "category": data.get("category")
    }

    product = ProductModel.crear(nuevo_producto)
    return jsonify({"mensaje": "Producto creado exitosamente", "producto": product}), 201

# ============================
# PUT actualizar producto
# ============================
@products_endpoints.route('/products/<id>', methods=['PUT'])
def actualizar_product(id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos inválidos"}), 400

    actualizado = ProductModel.actualizar(id, data)

    if actualizado:
        return jsonify({"mensaje": "Producto actualizado correctamente"}), 200
    return jsonify({"error": "No se pudo actualizar el producto"}), 400

# ============================
# DELETE eliminar producto
# ============================
@products_endpoints.route('/products/<id>', methods=['DELETE'])
def eliminar_product(id):
    eliminado = ProductModel.eliminar(id)

    if eliminado:
        return jsonify({"mensaje": "Producto eliminado correctamente"}), 200
    return jsonify({"error": "No se pudo eliminar el producto"}), 400
