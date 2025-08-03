from fastapi import WebSocket, APIRouter, WebSocketDisconnect
import asyncio
import random
import json
from datetime import datetime

router = APIRouter()


@router.websocket("/ws/telemetry")
async def telemetry_stream(websocket: WebSocket):
    """Send random telemetry data every second to connected clients."""
    await websocket.accept()
    try:
        while True:
            sample_data = {
                "source": random.choice(["satellite", "drone", "AUV"]),
                "lat": round(random.uniform(-90, 90), 5),
                "lon": round(random.uniform(-180, 180), 5),
                "alt": round(random.uniform(-1000, 800000), 2),
                "velocity": round(random.uniform(0, 7700), 2),
                "timestamp": datetime.utcnow().isoformat() + "Z",
            }
            await websocket.send_text(json.dumps(sample_data))
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        print("Telemetry WebSocket disconnected")