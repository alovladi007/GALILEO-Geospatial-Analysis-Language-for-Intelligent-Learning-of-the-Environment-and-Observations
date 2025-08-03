from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import random

router = APIRouter(prefix="/ml", tags=["Machine Learning"])


class SensorData(BaseModel):
    id: str
    type: str
    value: float
    unit: str
    timestamp: str


class AnomalyResult(BaseModel):
    id: str
    type: str
    value: float
    anomaly: bool
    confidence: float


@router.post("/detect_anomalies", response_model=List[AnomalyResult])
async def detect_anomalies(data: List[SensorData]):
    """Mock anomaly detection on incoming sensor data."""
    results: List[AnomalyResult] = []
    for d in data:
        is_anomaly = random.random() < 0.15  # 15% chance of anomaly
        confidence = round(random.uniform(0.7, 0.95) if is_anomaly else random.uniform(0.3, 0.6), 2)
        results.append(
            AnomalyResult(
                id=d.id,
                type=d.type,
                value=d.value,
                anomaly=is_anomaly,
                confidence=confidence,
            )
        )
    return results