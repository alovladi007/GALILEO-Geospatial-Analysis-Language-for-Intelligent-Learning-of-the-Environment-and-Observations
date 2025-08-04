import { useEffect, useState, useRef } from 'react';
import { api } from '../services/api';

export default function InteractiveMap() {
  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchSensors = async () => {
      const data = await api.getSensors();
      setSensors(data);
    };
    
    fetchSensors();
    const interval = setInterval(fetchSensors, 10000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw world map outline
    ctx.strokeStyle = '#16213e';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
    
    // Draw grid
    ctx.strokeStyle = '#0f3460';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i++) {
      const x = 50 + (canvas.width - 100) * i / 10;
      ctx.beginPath();
      ctx.moveTo(x, 50);
      ctx.lineTo(x, canvas.height - 50);
      ctx.stroke();
    }
    for (let i = 0; i <= 5; i++) {
      const y = 50 + (canvas.height - 100) * i / 5;
      ctx.beginPath();
      ctx.moveTo(50, y);
      ctx.lineTo(canvas.width - 50, y);
      ctx.stroke();
    }
    
    // Draw sensors
    sensors.forEach((sensor) => {
      const x = 50 + (canvas.width - 100) * (sensor.location[1] + 180) / 360;
      const y = 50 + (canvas.height - 100) * (90 - sensor.location[0]) / 180;
      
      // Sensor color based on type
      switch(sensor.type) {
        case 'temperature':
          ctx.fillStyle = '#ff8c00';
          break;
        case 'salinity':
          ctx.fillStyle = '#0096ff';
          break;
        case 'air_quality':
          ctx.fillStyle = '#8cff00';
          break;
        default:
          ctx.fillStyle = '#ffffff';
      }
      
      // Draw sensor point
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw glow effect
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    
  }, [sensors]);

  return (
    <div className="relative w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-crosshair"
        onClick={(e) => {
          const rect = e.target.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Find clicked sensor
          sensors.forEach((sensor) => {
            const sx = 50 + (rect.width - 100) * (sensor.location[1] + 180) / 360;
            const sy = 50 + (rect.height - 100) * (90 - sensor.location[0]) / 180;
            
            if (Math.abs(x - sx) < 15 && Math.abs(y - sy) < 15) {
              setSelectedSensor(sensor);
            }
          });
        }}
      />
      
      {/* Sensor Info Panel */}
      {selectedSensor && (
        <div className="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg text-white max-w-xs">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold">{selectedSensor.id}</h3>
            <button 
              onClick={() => setSelectedSensor(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="space-y-1 text-sm">
            <div>Type: <span className="capitalize">{selectedSensor.type}</span></div>
            <div>Value: {selectedSensor.value} {selectedSensor.unit}</div>
            <div>Location: {selectedSensor.location[0].toFixed(4)}, {selectedSensor.location[1].toFixed(4)}</div>
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-gray-800 p-4 rounded-lg text-white text-sm">
        <div className="font-bold mb-2">Sensor Types</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Temperature</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Salinity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Air Quality</span>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="absolute top-4 left-4 bg-gray-800 p-4 rounded-lg text-white">
        <div className="text-2xl font-bold">{sensors.length}</div>
        <div className="text-sm text-gray-400">Active Sensors</div>
      </div>
    </div>
  );
}