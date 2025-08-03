// Mock data for when backend is not available
export const mockSensors = [
  {
    id: "SEN001",
    type: "temperature",
    location: [40.7128, -74.0060],
    value: 22.5,
    unit: "°C",
    timestamp: new Date().toISOString()
  },
  {
    id: "SEN002",
    type: "salinity",
    location: [25.7617, -80.1918],
    value: 35.2,
    unit: "PSU",
    timestamp: new Date().toISOString()
  },
  {
    id: "SEN003",
    type: "air_quality",
    location: [34.0522, -118.2437],
    value: 42,
    unit: "AQI",
    timestamp: new Date().toISOString()
  },
  {
    id: "SEN004",
    type: "temperature",
    location: [51.5074, -0.1278],
    value: 15.8,
    unit: "°C",
    timestamp: new Date().toISOString()
  },
  {
    id: "SEN005",
    type: "salinity",
    location: [35.6762, 139.6503],
    value: 34.8,
    unit: "PSU",
    timestamp: new Date().toISOString()
  },
  {
    id: "SEN006",
    type: "air_quality",
    location: [-33.8688, 151.2093],
    value: 28,
    unit: "AQI",
    timestamp: new Date().toISOString()
  }
];

export const generateMockAnomalies = (sensors) => {
  return sensors.map(sensor => ({
    id: sensor.id,
    type: sensor.type,
    value: sensor.value,
    anomaly: Math.random() < 0.2,
    confidence: Math.random() * 0.5 + 0.5
  }));
};

export const generateRealtimeData = () => {
  const types = ['temperature', 'salinity', 'air_quality', 'pressure', 'humidity'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  
  return {
    id: `SEN${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`,
    type: randomType,
    value: Math.random() * 100,
    timestamp: new Date().toISOString(),
    location: [
      Math.random() * 180 - 90,
      Math.random() * 360 - 180
    ]
  };
};