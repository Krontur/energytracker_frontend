# 🌍 Energy Tracker – Frontend

**Energy Tracker** is the frontend of a complete energy data management platform developed as the **Final Degree Project (TFG)** of **Óscar González Tur** (BSc. in Computer Engineering).  
The system was designed for **Leipzig Airport**, enabling the visualization, analysis, and management of 15-minute load profiles from electric meters to improve energy efficiency and sustainability.

---

## 🧭 Project Overview

The frontend provides an intuitive, responsive interface that allows users to query, visualize, and analyze energy consumption data collected by the backend services.  
It connects to the **Spring Boot REST API** and displays data stored in the PostgreSQL database through interactive charts and tables.  

This platform empowers energy managers to:
- Identify consumption trends and inefficiencies.  
- Generate visual reports and CSV exports.  
- Manage devices, users, and access roles.  
- Support energy efficiency strategies aligned with **ISO 50001** standards.

---

## 💻 Tech Stack

| Category | Technologies |
|-----------|---------------|
| Framework | React.js |
| UI Library | Material-UI (MUI) |
| Charts | Chart.js |
| State Management | React Hooks |
| Build Tool | Vite |
| Backend Integration | REST API (Spring Boot) |
| Containerization | Docker |
| CI/CD | GitHub Actions |
| Version Control | Git + GitHub |

---

## 🎯 Main Features

- 🔐 **Secure authentication** (JWT-based)  
- 📊 **Interactive charts** using Chart.js  
- 📅 **Dynamic filtering** by date range and device  
- 📦 **CSV export** of consumption data  
- 👥 **Role-based management** (Admin / User)  
- ⚙️ **Responsive dashboard** built with Material-UI  
- 🚀 **Automated deployment** via GitHub Actions + Docker  

---

## 🧩 System Overview

             ┌──────────────────────────────┐
             │        Frontend (React)      │
             │   React + Material-UI + MUI  │
             └──────────────┬───────────────┘
                            │ REST API Calls
             ┌──────────────┴───────────────┐
             │         Backend (Java)       │
             │   Spring Boot Microservices  │
             └──────────────┬───────────────┘
                            │
                   PostgreSQL + RabbitMQ

---

## ⚙️ Local Setup

### Requirements
- Node.js ≥ 18  
- pnpm (recommended)  
- Running backend API (`energytracker`)  

### Installation

```bash
git clone <URL_DEL_REPOSITORIO>
cd energytracker-frontend
build_and_run.bat
```
---

## 🧭 Application Structure

```
src/
├── assets/ # Static resources (icons, images, styles, etc.)
├── components/ # Reusable UI components (buttons, tables, cards...)
├── context/ # Global state management using React Context API
├── hooks/ # Custom React hooks for shared logic
├── layouts/ # Page layout components (navigation, sidebar, etc.)
├── pages/ # Main pages (Dashboard, Login ...)
├── index.css # Global CSS styles
└── main.jsx # Application entry point
```

## 📜 License

This work is licensed under the **[Creative Commons BY-NC-ND 3.0 Spain](http://creativecommons.org/licenses/by-nc-nd/3.0/es/)** license.  
© 2025 **Óscar González Tur**

