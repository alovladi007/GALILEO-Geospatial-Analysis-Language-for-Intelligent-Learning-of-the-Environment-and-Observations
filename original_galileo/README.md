
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
