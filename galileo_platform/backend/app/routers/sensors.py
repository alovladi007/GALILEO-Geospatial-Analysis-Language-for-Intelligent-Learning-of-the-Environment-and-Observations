from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Tuple
from datetime import datetime

router = APIRouter(prefix="/sensors", tags=["Sensors"])


class SensorData(BaseModel):
    id: str
    type: str  # e.g. temperature, salinity, air_quality
    location: Tuple[float, float]
    value: float
    unit: str
    timestamp: datetime


@router.get("/sample", response_model=List[SensorData])
async def get_sample_sensors() -> List[SensorData]:
    """Return a simulated list of environmental sensor readings."""
    sample: List[SensorData] = [
        SensorData(
            id="SEN001",
            type="temperature",
            location=(40.7128, -74.0060),
            value=15.5,
            unit="°C",
            timestamp=datetime.utcnow(),
        ),
        SensorData(
            id="SEN002",
            type="salinity",
            location=(28.002, -88.112),
            value=35.2,
            unit="PSU",
            timestamp=datetime.utcnow(),
        ),
        SensorData(
            id="SEN003",
            type="air_quality",
            location=(34.05, -118.25),
            value=42,
            unit="AQI",
            timestamp=datetime.utcnow(),
        ),
    ]
    return sample