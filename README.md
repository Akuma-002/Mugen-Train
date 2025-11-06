<div align="center">
  <h1>🚄 Mugen-Train</h1>
  <p><b>AI-Ready Online Train Ticket Booking System built with MERN Stack + Python</b></p>

  <a href="https://github.com/Akuma-002/Mugen-Train/stargazers">
    <img src="https://img.shields.io/github/stars/Akuma-002/Mugen-Train?color=gold&style=for-the-badge" alt="Stars">
  </a>
  <a href="https://github.com/Akuma-002/Mugen-Train/network/members">
    <img src="https://img.shields.io/github/forks/Akuma-002/Mugen-Train?style=for-the-badge" alt="Forks">
  </a>
  <a href="https://github.com/Akuma-002/Mugen-Train/issues">
    <img src="https://img.shields.io/github/issues/Akuma-002/Mugen-Train?style=for-the-badge" alt="Issues">
  </a>
  <a href="https://github.com/Akuma-002/Mugen-Train/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Akuma-002/Mugen-Train?style=for-the-badge" alt="License">
  </a>
  <br>
  <img src="https://img.shields.io/badge/Frontend-React.js-blue?style=flat-square">
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=flat-square">
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?style=flat-square">
  <img src="https://img.shields.io/badge/Python-Seat%20Allocation-yellow?style=flat-square">
</div>

---

## 🧭 Table of Contents
1. [Project Overview](#-project-overview)
2. [Motivation](#-motivation)
3. [Features](#-features)
4. [Tech Stack](#-tech-stack)
5. [System Architecture](#-system-architecture)
6. [Workflow](#-workflow)
7. [API Endpoints](#-api-endpoints)
8. [Database Schema (Concept)](#-database-schema-concept)
9. [Setup and Installation](#-setup-and-installation)
10. [Environment Variables](#-environment-variables)
11. [Usage Guide](#-usage-guide)
12. [Folder Structure](#-folder-structure)
13. [Screenshots and UI Previews](#-screenshots-and-ui-previews)
14. [Performance & Security](#-performance--security)
15. [Testing](#-testing)
16. [Challenges Faced](#-challenges-faced)
17. [Future Roadmap](#-future-roadmap)
18. [Contributing](#-contributing)
19. [License](#-license)
20. [Contact](#-contact)

---

## 🚀 Project Overview
**Mugen-Train** is a full-stack train-ticket booking platform built using **MERN stack** and integrated with a **Python seat allocation module**.  
It replicates the functionalities of a national ticketing system (like IRCTC), providing users a seamless experience from train discovery to final booking.

The system demonstrates robust **API design**, **database modeling**, **authentication**, and a **modular architecture** suitable for scaling into production-grade infrastructure.

---

## 💡 Motivation
India’s train network handles over 20 million passengers daily. However, most booking systems are monolithic, slow, and limited to web interfaces.  
**Mugen-Train** was designed as a **scalable, modular alternative**, demonstrating how next-generation booking systems can be architected using modern technologies and AI-ready logic.

---

## ✨ Features
- 🔍 Real-time train search by source, destination, and time
- 🎟️ Ticket booking with automated seat allocation
- 🧾 Unique **PNR generation system** (Python-driven)
- 👤 Secure authentication using **JWT**
- 💳 Payment simulation module with mock verification
- 📅 View, modify, or cancel existing bookings
- 🧠 Modular backend ready for AI-based recommendations
- 🧩 Clean RESTful API architecture
- 🧰 Scalable design for multi-user concurrency

---

## 🧠 Tech Stack
| Layer | Technology | Purpose |
|:------|:------------|:---------|
| Frontend | React.js, TailwindCSS | UI and interaction |
| Backend | Node.js, Express | API routes and business logic |
| Database | MongoDB Atlas | Data persistence |
| Seat Allocation | Python | PNR, seat distribution logic |
| Authentication | JWT | Secure login and session handling |
| Dev Tools | VS Code, Postman, Git | Development & testing |

---

## 🏗️ System Architecture
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
      |    MongoDB Atlas    |
      +---------------------+
                |
      +---------v----------+
      |   Python Module    |
      | Seat Allocation /  |
      |  PNR Generation    |
      +--------------------+

**Key Insight:**  
- The Python module can operate as a microservice or internal script.  
- All major user flows are API-driven — ideal for scaling or mobile integration.

---

## 🔄 Workflow
1. **User Registration/Login**
   - Authenticated via JWT; credentials stored securely.
2. **Train Search**
   - Frontend calls `/api/trains/find` with source & destination.
3. **Booking**
   - Backend verifies train availability.
   - Python module assigns seat and PNR.
4. **Payment Simulation**
   - Mock confirmation triggers booking record creation.
5. **Booking History**
   - User retrieves all booked tickets.
6. **Cancellation**
   - Ticket is marked canceled; seat re-added to availability pool.

---

## 🧾 API Endpoints
| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/auth/register` | POST | Register new user |
| `/api/auth/login` | POST | Authenticate user |
| `/api/trains/find` | POST | Find trains between stations |
| `/api/bookings/create` | POST | Create a booking |
| `/api/bookings/user/:id` | GET | Fetch user’s bookings |
| `/api/bookings/cancel/:id` | PUT | Cancel a booking |
| `/api/seat/allocate` | POST | Trigger Python seat allocation |

---

## 🧩 Database Schema (Concept)

### **User**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashedpassword",
  "bookings": ["bookingId1", "bookingId2"]
}
Train
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
{
  "user_id": "userid",
  "train_id": "trainid",
  "seat_number": "C2-35",
  "pnr": "MUG1234567",
  "status": "confirmed"
}

## ⚙️ Setup and Installation

Follow these steps to set up and run **Mugen Train** locally on your system.

---

### 🧩 Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v18 or higher) → [Download Here](https://nodejs.org/)
- **npm** or **yarn** (npm comes with Node.js)
- **MongoDB** (local or cloud instance like [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Git**
- **VS Code** or any preferred code editor

---

### 🗂️ Clone the Repository

```bash
git clone https://github.com/Akuma-002/Mugen-Train.git
cd Mugen-Train


# Project Title (e.g., Train Booking System)

A brief description of your project. This application consists of a backend server and a frontend client, enabling users to search for, book, and manage train reservations.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
* [Node.js](https://nodejs.org/) (which includes npm)
* [MongoDB](https://www.mongodb.com/) (a local instance or a MongoDB Atlas connection string)
* A code editor (e.g., [VS Code](https://code.visualstudio.com/))

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### 1. Backend Setup (Server)

First, set up the server:

1.  Navigate to the backend directory:
    ```bash
    cd server
    ```

2.  Install all dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the root of the `/server` folder. Add the following environment variables, replacing the placeholder values with your own:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4.  Start the backend server:
    ```bash
    npm start
    ```

The backend will now be running on: <http://localhost:5000>

---

### 2. Frontend Setup (Client)

In a **new terminal**, set up the client:

1.  Navigate to the client directory from the project root:
    ```bash
    cd client
    ```

2.  Install frontend dependencies:
    ```bash
    npm install
    ```

3.  (Optional) If your backend is running on a different URL, create a `.env` file inside the `/client` folder to specify the API endpoint:
    ```env
    VITE_API_BASE_URL=http://localhost:5000
    ```

4.  Start the frontend development server:
    ```bash
    npm run dev
    ```

The frontend will now be running on: <http://localhost:5173>

---

## 🏃‍♀️ Running the Project

After completing the steps above, both your backend and frontend should be running.

* **Backend:** <http://localhost:5000>
* **Frontend:** <http://localhost:5173>

Open your browser and navigate to the frontend URL (<http://localhost:5173>) to access the web app. The client will interact with the server through REST APIs for booking trains, user authentication, and real-time updates.

## 🧪 Test Your Setup

To confirm everything is working correctly:

1.  Register for a new account or log in through the frontend UI.
2.  Search for available trains between two destinations.
3.  Try booking a ticket.

If the booking is successful, the system should save the data to your MongoDB database. If all these steps work, your setup is complete! 🎉

---

## 🛠️ Common Issues

Here are a few common issues you might encounter:

* **Port already in use:**
    * **Solution:** Stop any other processes using port `5000` or `5173`. Alternatively, change the `PORT` value in the server's `.env` file and update the frontend's `VITE_API_BASE_URL` to match.
* **MongoDB connection error:**
    * **Solution:** Double-check that your `MONGO_URI` connection string in the server's `.env` file is correct. If you are using MongoDB Atlas, ensure you have whitelisted your current IP address.
* **CORS issues:**
    * **Solution:** Ensure your backend server has CORS (Cross-Origin Resource Sharing) enabled and is configured to accept requests from the frontend domain (<http://localhost:5173>).

---

## 💡 Optional: Run Both Servers Concurrently

To make development easier, you can run both the backend and frontend with a single command using `concurrently`.

1.  Install `concurrently` as a dev dependency in the **root** project directory:
    ```bash
    npm install concurrently --save-dev
    ```

2.  Then, modify the `scripts` section in your **root** `package.json` file:
    ```json
    "scripts": {
      "dev": "concurrently \"npm start --prefix server\" \"npm run dev --prefix client\""
    }
    ```

3.  Now you can run both servers at the same time from the root directory:
    ```bash
    npm run dev
    ```
