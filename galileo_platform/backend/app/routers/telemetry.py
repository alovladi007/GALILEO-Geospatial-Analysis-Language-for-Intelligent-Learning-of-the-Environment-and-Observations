from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter(prefix="/telemetry", tags=["Telemetry"])


class TelemetryData(BaseModel):
    source: str  # satellite, drone, AUV
    id: str
    lat: float
    lon: float
    alt: float  # altitude in meters (negative for depth)
    velocity: float  # m/s
    timestamp: datetime


@router.get("/sample", response_model=List[TelemetryData])
async def get_sample_telemetry() -> List[TelemetryData]:
    """Return a simulated set of telemetry points."""
    now = datetime.utcnow()
    sample: List[TelemetryData] = [
        TelemetryData(
            source="satellite",
            id="Sentinel-2A",
            lat=34.56,
            lon=-120.76,
            alt=786000,  # 786 km
            velocity=7612.3,
            timestamp=now,
        ),
        TelemetryData(
            source="drone",
            id="Quad-XR",
            lat=48.8566,
            lon=2.3522,
            alt=150,
            velocity=32.5,
            timestamp=now,
        ),
        TelemetryData(
            source="AUV",
            id="Bluefin-21",
            lat=-17.7134,
            lon=178.065,
            alt=-500,
            velocity=4.2,
            timestamp=now,
        ),
    ]
    return sample