from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("TRAIN_URL")

async def test_connection():
    try:
        if not MONGO_URI:
            print("❌ TRAIN_URL not found in .env file.")
            return
        client = AsyncIOMotorClient(MONGO_URI)
        db = client["train-list"]
        await db.command("ping")
        print("✅ MongoDB Atlas connection successful.")
    except Exception as e:
        print("❌ MongoDB connection failed:", str(e))

asyncio.run(test_connection())
