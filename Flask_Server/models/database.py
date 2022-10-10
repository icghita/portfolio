from flask_sqlalchemy import SQLAlchemy


DB = SQLAlchemy()
SqlAlchemyBase = DB.Model
print(DB)