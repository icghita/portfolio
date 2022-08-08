from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import MetaData
from config import DATABASE_URL


engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
    echo=True,
    future=True,
)

LocalSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

SqlAlchemyBase = declarative_base()


""" engine = create_async_engine(
    DATABASE_URL,
    echo=True,
) """


""" async def Database_Connect():
    await database.connect()

async def Database_Disconnect():
    await database.disconnect()
 """
