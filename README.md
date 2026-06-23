# Trip Planner — Frontend


> The frontend was built with AI assistance and aims to demonstrate working REST API integration — not frontend design or engineering skills.

---

## Overview

This is the React frontend for the Trip Planner application. It connects to the [Trip Planner backend](https://github.com/slavova-ralitsa/trip-planner) and lets users manage trips, pick destinations, and visualise optimised routes on an interactive map.

---

## Features

* **Welcome Screen** – Personalised splash screen on login
* **User Registration and Authentication** – Secure signup/login with JWT-based auth
* **Trip Management** – Create, edit, and delete trips with a name, date range and destinations
* **Route Visualisation** – Optimised routes displayed on an interactive Leaflet map
* **Favorites** – Mark and filter favourite trips

---

## Installation Guide

Follow the steps below to run the project locally.

### Requirements

Make sure you have installed:

* Node.js 18+
* npm
* Git
* The [Trip Planner backend](https://github.com/slavova-ralitsa/trip-planner) running on `http://localhost:8087`

---

## Clone the Repository

```bash
git clone https://github.com/slavova-ralitsa/trip-planner-frontend.git
cd trip-planner-frontend
```

---

## Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8087/api
```

If your backend runs on a different port, update this value.

---

## Run the Application

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Then open `http://localhost:5173`.

---

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Tech Stack

* **Frontend:** React 19, Vite 8
* **Routing:** React Router v7
* **Maps:** Leaflet 1.9 (OpenStreetMap tiles, no API key needed)
* **HTTP Client:** Axios

