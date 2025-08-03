// Determine API URL based on environment
const getApiUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  }
  
  // Client-side
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Default to localhost for development
  return 'http://localhost:8000';
};

const API_URL = getApiUrl();

import { mockSensors, generateMockAnomalies } from './mockData';

export const api = {
  // Fetch sensor data
  async getSensors() {
    try {
      const response = await fetch(`${API_URL}/sensors/sample`);
      if (!response.ok) throw new Error('Failed to fetch sensors');
      return await response.json();
    } catch (error) {
      console.error('Error fetching sensors, using mock data:', error);
      return mockSensors;
    }
  },

  // Detect anomalies
  async detectAnomalies(sensorData) {
    try {
      const response = await fetch(`${API_URL}/ml/detect_anomalies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sensorData),
      });
      if (!response.ok) throw new Error('Failed to detect anomalies');
      return await response.json();
    } catch (error) {
      console.error('Error detecting anomalies, using mock data:', error);
      return generateMockAnomalies(sensorData);
    }
  },

  // WebSocket connection for real-time data
  connectWebSocket(onMessage) {
    const wsUrl = API_URL.replace('http', 'ws') + '/ws';
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('WebSocket connected');
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket disconnected');
      // Reconnect after 3 seconds
      setTimeout(() => this.connectWebSocket(onMessage), 3000);
    };
    
    return ws;
  }
};