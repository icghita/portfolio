from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from config import DATABASE_URL


engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
    echo=True,
    future=True,
)

LocalSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def Get_Database():
    db = LocalSession()
    try:
        yield db
    finally:
        db.close()


""" engine = create_async_engine(
    DATABASE_URL,
    echo=True,
) """


""" async def Database_Connect():
    await database.connect()

async def Database_Disconnect():
    await database.disconnect()
 """
