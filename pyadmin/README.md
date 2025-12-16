# pyadmin — Python FastAPI microservice

This service provides train search and seat allocation logic using FastAPI and MongoDB.

## Setup

1. Create and activate virtual environment (Windows example):

```powershell
cd pyadmin
python -m venv .venv
.\.venv\Scripts\Activate
```

2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Configure environment variables in `.env`:

```
TRAIN_URL=<your-mongo-uri>
```

4. Run the service (development)

```bash
uvicorn main:app --reload --port 8001
```

Endpoints:
- `GET /api` — health
- `GET /api/trains/all` — list all trains
- `POST /api/trains/find` — search trains by source & destination

Notes:
- The service uses `pymongo` to connect to MongoDB.
- Port `8001` is used in examples; change if needed.
