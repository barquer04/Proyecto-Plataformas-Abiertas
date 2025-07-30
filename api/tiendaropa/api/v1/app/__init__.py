from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config["MONGO_URI"] = "mongodb+srv://barquer0:marcita@cluster0.cxkzthf.mongodb.net/tiendaropa?retryWrites=true&w=majority&appName=Cluster0"

    mongo.init_app(app)
    CORS(app, origins="*")

    from .controllers.usuarios import usuarios_endpoint
    from .controllers.ropa import ropa_endpoint

    app.register_blueprint(usuarios_endpoint, url_prefix="/tiendaropa/api/v1")
    app.register_blueprint(ropa_endpoint, url_prefix="/tiendaropa/api/v1")

    return app
from .controllers.reportes import reportes_endpoint
app.register_blueprint(reportes_endpoint, url_prefix="/tiendaropa/api/v1")
