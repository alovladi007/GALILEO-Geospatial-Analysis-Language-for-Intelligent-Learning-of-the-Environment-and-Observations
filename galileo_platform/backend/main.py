from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Local imports
from app.routers import sensors, telemetry, ml, ws

app = FastAPI(title="GALILEO Backend API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(sensors.router)
app.include_router(telemetry.router)
app.include_router(ml.router)
app.include_router(ws.router)


@app.get("/")
async def root():
    """Health-check endpoint."""
    return {"status": "ok", "message": "GALILEO backend is live"}

@app.get("/health")
async def health_check():
    """Health check endpoint for Render."""
    return {"status": "healthy", "service": "galileo-api", "version": "0.1.0"}