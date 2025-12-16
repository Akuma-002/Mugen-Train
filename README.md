<div align="center">
  <h1>🚄 Mugen-Train</h1>
  <p><strong>AI‑Ready Online Train Ticket Booking System</strong> — MERN + Python microservice</p>
  <p>
    <a href="https://github.com/Akuma-002/Mugen-Train/stargazers"><img src="https://img.shields.io/github/stars/Akuma-002/Mugen-Train?style=for-the-badge" alt="Stars"/></a>
    <a href="https://github.com/Akuma-002/Mugen-Train/network/members"><img src="https://img.shields.io/github/forks/Akuma-002/Mugen-Train?style=for-the-badge" alt="Forks"/></a>
    <a href="https://github.com/Akuma-002/Mugen-Train/issues"><img src="https://img.shields.io/github/issues/Akuma-002/Mugen-Train?style=for-the-badge" alt="Issues"/></a>
    <a href="./LICENSE"><img src="https://img.shields.io/github/license/Akuma-002/Mugen-Train?style=for-the-badge" alt="License"/></a>
  </p>
</div>

---

## 📋 Table of Contents

1. [Project](#project)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Architecture & Folder Layout](#architecture--folder-layout)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [Running the Project (dev)](#running-the-project-dev)
8. [API Overview](#api-overview)
9. [Development & Testing](#development--testing)
10. [Contributing](#contributing)
11. [License & Contact](#license--contact)

---

## 🚀 Project

Mugen‑Train is a full-stack train ticket booking system demonstrating a scalable, modular architecture. It provides train discovery, seat allocation and booking workflows. A small Python microservice (FastAPI) handles train search and seat allocation logic (PNR generation ready).

## ✨ Features

- Train search (by source/destination)
- Booking flow with seat allocation and PNR
- JWT authentication (users)
- Booking history, cancelation, and simulated payments
- Admin APIs to manage trains
- Frontend built with React + Vite + Tailwind
- Backend API built with Node.js + Express + MongoDB
- Python (FastAPI) service for train search & allocation

## 🧰 Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB (Atlas or local)
- Microservice: Python (FastAPI) for seat allocation
- Auth: JSON Web Tokens (JWT)

---

## 🏗️ Architecture & Folder Layout

Top-level layout (important files/folders):

- `frontend/` — React client (Vite)
- `server/` — Main Node/Express API (users, bookings)
- `admin/` — Admin Express API (train management)
- `pyadmin/` — Python FastAPI microservice (train data, search, allocation)
- `sampleData.json` — sample data for dev/test

---

## ✅ Getting Started (Prerequisites)

- Node.js v18+ and npm/yarn
- Python 3.10+ (for `pyadmin`)
- MongoDB Atlas or local MongoDB
- Git

Windows tips: use PowerShell or Windows Terminal. For Python env: use `python -m venv .venv` then `.\.venv\Scripts\Activate`.

---

## 🔧 Environment Variables

Create a `.env` file in each service folder as needed.

server/.env (example):
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

admin/.env (example):
```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

pyadmin/.env (example):
```
TRAIN_URL=your_mongodb_connection_string_for_train_collection
```

frontend uses Vite env prefixed with `VITE_` (e.g., `VITE_API_BASE_URL=http://localhost:5000`).

---

## ▶️ Running the Project (development)

1. Clone the repo

```bash
git clone https://github.com/Akuma-002/Mugen-Train.git
cd Mugen-Train
```

2. Install and run the backend API

```bash
cd server
npm install
# create .env then:
npm run dev    # uses nodemon
```

3. Install and run the admin API (optional)

```bash
cd ../admin
npm install
npm run dev
```

4. Install and run the Python microservice

```powershell
cd ../pyadmin
python -m venv .venv
.\.venv\Scripts\Activate
pip install -r requirements.txt
# run with uvicorn
uvicorn main:app --reload --port 8001
```

5. Install and run the frontend

```bash
cd ../frontend
npm install
# set VITE_API_BASE_URL in .env if needed
npm run dev
```

Access the frontend at `http://localhost:5173` (Vite default).

---

## 📡 API Overview

Server (Node/Express) highlights:

- `POST /api/auth/register` — register user
- `POST /api/auth/login` — login (returns JWT)
- `POST /api/trains/find` — find trains (proxied to pyadmin in some flows)
- `POST /api/bookings/create` — create booking
- `GET /api/bookings/user/:id` — get user bookings
- `PUT /api/bookings/cancel/:id` — cancel booking

Python microservice (FastAPI) highlights:

- `GET /api` — health
- `GET /api/trains/all` — list trains
- `POST /api/trains/find` — search trains by source/destination

For detailed API usage, inspect the route handlers in `server/controllers/` and `pyadmin/main.py`.

---

## 🧪 Development & Testing

- Backend: `npm run dev` (uses `nodemon`) in `server` and `admin`.
- Frontend: `npm run dev` in `frontend` (Vite)
- Python service: `uvicorn main:app --reload` in `pyadmin`

Tips:
- Use Postman/Insomnia to exercise endpoints.
- Seed the DB using `sampleData.json` (import into MongoDB) during development.

---

## 🤝 Contributing

Contributions are welcome — open issues or PRs. When proposing changes:

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit changes and open a PR describing your work

Please follow existing code style and include tests when applicable.

---

## 📄 License & Contact

Released under the **MIT License** — see `LICENSE`.

Maintainer: Akuma-002 (via GitHub)

If you'd like help running or extending this project, open an issue or PR.

---

> If anything is missing or you'd like a more detailed developer guide (Docker, CI/CD, tests), tell me which part to expand and I'll add it. ✅
