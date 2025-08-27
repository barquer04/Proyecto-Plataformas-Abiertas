from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config["MONGO_URI"] = "mongodb+srv://admin:Admin1234@cluster0.xzeyyo4.mongodb.net/orchidjewerly?retryWrites=true&w=majority"
    mongo.init_app(app)
    CORS(app)
    
    from .controllers.products import products_endpoints
    from .controllers.users import users_endpoints


    app.register_blueprint(products_endpoints, url_prefix="/orchidjewerly/api/v1")
    app.register_blueprint(users_endpoints, url_prefix="/orchidjewerly/api/v1")


    CORS(app, origins="*")

    return app