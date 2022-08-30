from sqlalchemy.ext.declarative import declarative_base

SqlAlchemyBase = declarative_base()

from models.images import ImagesTable
from models.contents import ContentsTable
from models.technologies import TechnologiesTable
from models.items import ItemsTable