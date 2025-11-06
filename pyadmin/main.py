from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from dotenv import load_dotenv
from pydantic import BaseModel
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(title="Train API", version="1.0")

# CORS setup – allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify your Vite dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to MongoDB Atlas
try:
    mongo_uri = os.getenv("TRAIN_URL")
    client = MongoClient(mongo_uri)
    db = client["train-list"]
    trains_collection = db["trains"]
    print("✅ MongoDB Atlas connected successfully.")
except Exception as e:
    print("❌ MongoDB connection failed:", e)
    raise e


# ----------- MODELS -----------
class TrainSearch(BaseModel):
    source: str
    destination: str
    date: str = None
    trainClass: str = None
    passengers: int = 1


# ----------- ROUTES -----------

@app.get("/")
def root():
    return {"message": "Train API is running"}


@app.get("/trains/all")
def get_all_trains():
    trains = list(trains_collection.find({}, {"_id": 0}))
    if not trains:
        raise HTTPException(status_code=404, detail="No trains found in database.")
    return trains


@app.post("/trains/find")
def find_trains(search: TrainSearch):
    source = search.source.strip().lower()
    destination = search.destination.strip().lower()

    if not source or not destination:
        raise HTTPException(status_code=400, detail="Source and destination are required.")

    # Case-insensitive search
    query = {
        "$and": [
            {"departure_station": {"$regex": f"^{source}$", "$options": "i"}},
            {"arrival_station": {"$regex": f"^{destination}$", "$options": "i"}}
        ]
    }

    results = list(trains_collection.find(query, {"_id": 0}))

    if not results:
        raise HTTPException(status_code=404, detail=f"No trains found from {source.title()} to {destination.title()}.")

    return results
