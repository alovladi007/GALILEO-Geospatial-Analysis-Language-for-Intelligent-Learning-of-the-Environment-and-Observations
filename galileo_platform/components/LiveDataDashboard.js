import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function LiveDataDashboard() {
  const [sensors, setSensors] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [realTimeData, setRealTimeData] = useState([]);

  useEffect(() => {
    // Fetch initial sensor data
    const fetchData = async () => {
      setIsLoading(true);
      const sensorData = await api.getSensors();
      setSensors(sensorData);
      
      // Check for anomalies
      if (sensorData.length > 0) {
        const anomalyResults = await api.detectAnomalies(sensorData);
        setAnomalies(anomalyResults);
      }
      
      setIsLoading(false);
    };

    fetchData();
    
    // Set up periodic refresh
    const interval = setInterval(fetchData, 5000);
    
    // Connect WebSocket for real-time updates
    const ws = api.connectWebSocket((data) => {
      setRealTimeData(prev => [...prev.slice(-20), data]);
    });
    
    return () => {
      clearInterval(interval);
      if (ws) ws.close();
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Real-time Status */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded">
            <div className="text-sm text-gray-400">Active Sensors</div>
            <div className="text-3xl font-bold text-green-400">{sensors.length}</div>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <div className="text-sm text-gray-400">Anomalies Detected</div>
            <div className="text-3xl font-bold text-red-400">
              {anomalies.filter(a => a.anomaly).length}
            </div>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <div className="text-sm text-gray-400">Data Points</div>
            <div className="text-3xl font-bold text-blue-400">{realTimeData.length}</div>
          </div>
        </div>
      </div>

      {/* Sensor Readings */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Live Sensor Readings</h2>
        {isLoading ? (
          <div className="text-gray-400">Loading sensor data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sensors.map((sensor) => {
              const anomaly = anomalies.find(a => a.id === sensor.id);
              return (
                <div 
                  key={sensor.id} 
                  className={`p-4 rounded-lg ${
                    anomaly?.anomaly ? 'bg-red-900 border-2 border-red-500' : 'bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-sm text-gray-400">{sensor.id}</div>
                      <div className="text-lg font-semibold capitalize">{sensor.type}</div>
                    </div>
                    {anomaly?.anomaly && (
                      <span className="text-xs bg-red-600 px-2 py-1 rounded">ANOMALY</span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {sensor.value} {sensor.unit}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Location: {sensor.location[0].toFixed(4)}, {sensor.location[1].toFixed(4)}
                  </div>
                  {anomaly && (
                    <div className="text-xs text-gray-400 mt-1">
                      Confidence: {(anomaly.confidence * 100).toFixed(0)}%
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Real-time Data Stream */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Real-time Data Stream</h2>
        <div className="bg-gray-900 p-4 rounded h-64 overflow-y-auto">
          {realTimeData.length === 0 ? (
            <div className="text-gray-500">Waiting for real-time data...</div>
          ) : (
            <div className="space-y-2">
              {realTimeData.map((data, index) => (
                <div key={index} className="text-xs text-gray-400 font-mono">
                  {new Date().toISOString()} - {JSON.stringify(data)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}