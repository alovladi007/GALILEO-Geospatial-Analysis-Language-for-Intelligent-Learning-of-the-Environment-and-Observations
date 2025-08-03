
# GALILEO Platform: Final Deployment (Frontend + Backend + PostgreSQL + ML)

## 🚀 Docker Deployment Guide

### Step 1: Build and Start Services
```bash
docker-compose up --build
```

### Step 2: Access Services
- Frontend: http://localhost:3000
- Backend API (FastAPI): http://localhost:8000/docs
- PostgreSQL DB: localhost:5432 (user: postgres, password: password)

### Components:
- PostgreSQL + PostGIS for spatial data storage
- FastAPI backend for sensor, telemetry, and ML APIs
- Next.js frontend (React-based UI)

---

## Folder Structure
- `/backend` - API source code
- `/frontend` - Website and UI
- `/public` - Assets and media
- `GALILEO_ML_Training_Notebook.ipynb` - ML anomaly detection

## Development Workflow

### Prerequisites
- Node.js ≥ 18
- Python ≥ 3.10
- PostgreSQL 15 with PostGIS extension

### Environment Variables

Create a `.env.local` in the project root with:

```
NEXT_PUBLIC_MAPBOX_TOKEN=<your Mapbox token>
NEXT_PUBLIC_CESIUM_ION_TOKEN=<your Cesium ion token>
```

### Running Locally (without Docker)

Terminal 1 – Start FastAPI backend:
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000
```

Terminal 2 – Start Next.js frontend:
```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

### Database Setup

1. Create database `galileo` and enable PostGIS:
   ```sql
   CREATE DATABASE galileo;
   \c galileo
   CREATE EXTENSION postgis;
   ```
2. Run schema migrations:
   ```bash
   psql -U postgres -d galileo -f backend/schema.sql
   ```

### Linting & Formatting

This repo uses **Prettier** (JS) and **ruff** (Python):
```bash
npm run lint          # JS/TS
ruff check backend    # Python
```
