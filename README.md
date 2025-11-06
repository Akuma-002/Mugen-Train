<div align="center"> <h1>🚄 Mugen-Train</h1> <p><b>AI-Ready Online Train Ticket Booking System built with MERN Stack + Python</b></p> <a href="https://github.com/Akuma-002/Mugen-Train/stargazers"> <img src="https://img.shields.io/github/stars/Akuma-002/Mugen-Train?color=gold&style=for-the-badge" alt="Stars"> </a> <a href="https://github.com/Akuma-002/Mugen-Train/network/members"> <img src="https://img.shields.io/github/forks/Akuma-002/Mugen-Train?style=for-the-badge" alt="Forks"> </a> <a href="https://github.com/Akuma-002/Mugen-Train/issues"> <img src="https://img.shields.io/github/issues/Akuma-002/Mugen-Train?style=for-the-badge" alt="Issues"> </a> <a href="https://github.com/Akuma-002/Mugen-Train/blob/main/LICENSE"> <img src="https://img.shields.io/github/license/Akuma-002/Mugen-Train?style=for-the-badge" alt="License"> </a> <br> <img src="https://img.shields.io/badge/Frontend-React.js-blue?style=flat-square"> <img src="https://img.shields.io/badge/Backend-Node.js-green?style=flat-square"> <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?style=flat-square"> <img src="https://img.shields.io/badge/Python-Seat%20Allocation-yellow?style=flat-square"> </div>
🧭 Table of Contents
Project Overview

Motivation

Features

Tech Stack

System Architecture

Workflow

API Endpoints

Database Schema (Concept)

Setup and Installation

Environment Variables

Usage Guide

Folder Structure

Screenshots and UI Previews

Performance & Security

Testing

Challenges Faced

Future Roadmap

Contributing

License

Contact

🚀 Project Overview
Mugen-Train is a full-stack train-ticket booking platform built using the MERN stack and a Python seat allocation microservice.
It replicates national ticketing system functions (like IRCTC), giving users an end-to-end experience from train discovery through booking and cancellation.

The system demonstrates robust API design, database modeling, authentication, and a modular architecture suitable for scalable production deployment.

💡 Motivation
India's train network serves over 20 million passengers daily. Most legacy booking systems are monolithic and slow.
Mugen-Train was envisioned as a scalable, modular upgrade designed with modern technologies and AI-ready logic.

✨ Features
🔍 Real-time train search by source, destination, and time

🎟️ Ticket booking with automated seat allocation (Python)

🧾 Unique PNR generation system (Python)

👤 Secure authentication via JWT

💳 Payment simulation module

📅 View, modify, and cancel bookings

🧠 Backend ready for AI recommendations

🧩 Clean REST API design

🧰 Scalable for multi-user concurrency

🧠 Tech Stack
Layer	Technology	Purpose
Frontend	React.js, TailwindCSS	UI and interaction
Backend	Node.js, Express	API routes and business logic
Database	MongoDB Atlas	Data persistence
Python Module	Python	PNR & seat allocation logic
Authentication	JWT	Secure session handling
Dev Tools	VS Code, Postman, Git	Development & testing
🏗️ System Architecture
text
+--------------------+
|      React UI      |
+---------+----------+
          |
          v
+--------------------+
|   Express Server   |
|  (Node.js / API)   |
+---------+----------+
          |
+---------v----------+
|   MongoDB Atlas    |
+--------------------+
          |
+---------v----------+
|   Python Module    |
|  (Seat Allocation) |
+--------------------+
Key Insight:

The Python module operates as a microservice or internal script.

All major user flows are API-driven, ideal for scaling or mobile integration.

🔄 Workflow
User Registration/Login

Authenticated with JWT; credentials securely stored.

Train Search

Frontend calls /api/trains/find (source & destination).

Booking

Backend verifies train availability; Python assigns seat & PNR.

Payment Simulation

Mock confirmation triggers booking record.

Booking History

User fetches all bookings.

Cancellation

Ticket is cancelled, seat returned to pool.

🧾 API Endpoints
Endpoint	Method	Description
/api/auth/register	POST	Register new user
/api/auth/login	POST	Authenticate user
/api/trains/find	POST	Find trains by stations
/api/bookings/create	POST	Book a seat
/api/bookings/user/:id	GET	Fetch user bookings
/api/bookings/cancel/:id	PUT	Cancel a booking
/api/seat/allocate	POST	Trigger seat allocation
🧩 Database Schema (Concept)
User

json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashedpassword",
  "bookings": ["bookingId1", "bookingId2"]
}
Train

json
{
  "train_name": "SARAIGHAT EXPRESS",
  "train_number": 12345,
  "source": "Howrah",
  "destination": "Guwahati",
  "departure_time": "16:05",
  "arrival_time": "09:45",
  "available_seats": 120
}
Booking

json
{
  "user_id": "userid",
  "train_id": "trainid",
  "seat_number": "C2-35",
  "pnr": "MUG1234567",
  "status": "confirmed"
}
⚙️ Setup and Installation
Prerequisites
Node.js (v18 or higher)

npm or yarn

MongoDB (local or Atlas)

Git

VS Code (recommended, or any code editor)

Clone the Repository
bash
git clone https://github.com/Akuma-002/Mugen-Train.git
cd Mugen-Train
Backend Setup
bash
cd server
npm install
Create a .env file inside /server:

text
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start the backend server:

bash
npm start
Backend runs on http://localhost:5000.

Frontend Setup
Open a new terminal:

bash
cd client
npm install
If backend runs on another URL, create .env in /client:

text
VITE_API_BASE_URL=http://localhost:5000
Start the frontend:

bash
npm run dev
Frontend runs on http://localhost:5173.

Run Both Servers Concurrently (Optional)
Install concurrently as a dev dependency in root:

bash
npm install concurrently --save-dev
Edit root package.json scripts:

json
"scripts": {
  "dev": "concurrently \"npm start --prefix server\" \"npm run dev --prefix client\""
}
Run servers together:

bash
npm run dev
🧪 Test Your Setup
Register or login via frontend.

Search for trains.

Book a ticket.

Booking success saves data to your MongoDB database.

🛠️ Common Issues
Port in use: Stop other apps using 5000 or 5173, or change .env values.

MongoDB connection error: Check your MONGO_URI and Atlas IP whitelist.

CORS issues: Backend should allow requests from http://localhost:5173.

📝 License
Released under the MIT License.
