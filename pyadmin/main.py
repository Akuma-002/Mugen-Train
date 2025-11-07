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

@app.get("/api")
def root():
    return {"message": "Train API is running"}


@app.get("/api/trains/all")
def get_all_trains():
    trains = list(trains_collection.find({}, {"_id": 0}))
    if not trains:
        raise HTTPException(status_code=404, detail="No trains found in database.")
    return trains


@app.post("/api/trains/find")
def find_trains(search: TrainSearch):
    source = search.source.strip().lower()
    destination = search.destination.strip().lower()

    if not source or not destination:
        raise HTTPException(status_code=400, detail="Source and destination are required.")

    trains = list(trains_collection.find({}, {"_id": 0}))

    results = []
    for train in trains:
        train_route = train.get("train_route", {})
        # Convert dict values to list and sort by distance_from_source or arrival_day/time
        routes = list(train_route.values())
        routes.sort(key=lambda route: route.get("distance_from_source", 0))

        source_index = -1
        destination_index = -1

        for idx, route in enumerate(routes):
            city = route.get("city", "").strip().lower()
            if city == source and source_index == -1:
                source_index = idx
            if city == destination:
                destination_index = idx

        if source_index != -1 and destination_index != -1 and destination_index > source_index:
            results.append(train)

    if not results:
        raise HTTPException(status_code=404, detail=f"No trains found from {search.source.title()} to {search.destination.title()}.")

    return results
