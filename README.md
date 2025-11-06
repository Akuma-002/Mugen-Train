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
