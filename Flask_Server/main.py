import sys, os
print(os.getcwd())
sys.path.insert(0, os.getcwd())

from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView

from config import CLIENT_URI, DATABASE_URI
from models.database import DB
from graphQL.queries import graphql_schema


api = Flask(__name__, static_folder="../public_html", instance_path=os.getcwd())
api.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
api.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

DB.init_app(api)
CORS(api, resources={
    r"/*": {
        "origins": CLIENT_URI
    }
})

api.add_url_rule("/",
                 view_func=GraphQLView.as_view(
                     "graphql",
                     schema=graphql_schema,
                     graphiql=True,
                 ))
