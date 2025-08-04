import { useEffect, useState } from 'react';
import { api } from '../services/api';

// Lazy load map components to prevent SSR issues
let Map = null;
let DeckGL = null;
let ScatterplotLayer = null;

if (typeof window !== 'undefined') {
  Map = require('react-map-gl').default;
  DeckGL = require('@deck.gl/react').default;
  ScatterplotLayer = require('@deck.gl/layers').ScatterplotLayer;
}

export default function SensorMap() {
  const [sensors, setSensors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: -95.7129,
    latitude: 37.0902,
    zoom: 3,
    pitch: 30,
    bearing: 0
  });

  useEffect(() => {
    // Check if libraries are loaded
    if (typeof window !== 'undefined') {
      setIsLoaded(true);
    }

    const fetchSensors = async () => {
      try {
        const data = await api.getSensors();
        setSensors(data);
      } catch (error) {
        console.error('Error fetching sensors:', error);
      }
    };
    
    fetchSensors();
    const interval = setInterval(fetchSensors, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Only create layers if libraries are loaded
  const layers = isLoaded && ScatterplotLayer ? [
    new ScatterplotLayer({
      id: 'sensor-points',
      data: sensors,
      getPosition: d => d.location,
      getRadius: d => 50000,
      getFillColor: d => {
        switch(d.type) {
          case 'temperature': return [255, 140, 0];
          case 'salinity': return [0, 150, 255];
          case 'air_quality': return [140, 255, 0];
          default: return [255, 255, 255];
        }
      },
      radiusMinPixels: 5,
      radiusMaxPixels: 20,
      pickable: true,
      onHover: info => {
        if (info.object && typeof document !== 'undefined') {
          const tooltip = document.getElementById('tooltip');
          if (tooltip) {
            tooltip.innerHTML = `
              <div class="bg-gray-800 p-2 rounded text-white text-sm">
                <div class="font-bold">${info.object.id}</div>
                <div>Type: ${info.object.type}</div>
                <div>Value: ${info.object.value} ${info.object.unit}</div>
                <div>Location: ${info.object.location[0].toFixed(4)}, ${info.object.location[1].toFixed(4)}</div>
              </div>
            `;
            tooltip.style.display = 'block';
            tooltip.style.left = info.x + 'px';
            tooltip.style.top = info.y + 'px';
          }
        } else {
          const tooltip = document.getElementById('tooltip');
          if (tooltip) tooltip.style.display = 'none';
        }
      }
    })
  ] : [];

  // Fallback UI if map libraries aren't loaded
  if (!isLoaded || !Map || !DeckGL || mapError) {
    return (
      <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-gray-900">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="mb-8">
            <svg className="w-24 h-24 text-blue-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Sensor Map</h3>
          <p className="text-gray-400 mb-8">Interactive 3D visualization</p>
          
          {/* Sensor List */}
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            {sensors.map((sensor) => (
              <div key={sensor.id} className="bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-400">{sensor.id}</div>
                <div className="font-semibold capitalize">{sensor.type}</div>
                <div className="text-lg">{sensor.value} {sensor.unit}</div>
                <div className="text-xs text-gray-500">
                  {sensor.location[0].toFixed(2)}, {sensor.location[1].toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Try to render the map with error boundary
  try {
    return (
      <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
        <DeckGL
          viewState={viewState}
          onViewStateChange={({viewState}) => setViewState(viewState)}
          controller={true}
          layers={layers}
          onError={(error) => {
            console.error('DeckGL Error:', error);
            setMapError(true);
          }}
        >
          <Map
            mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
            onError={(error) => {
              console.error('Map Error:', error);
              setMapError(true);
            }}
          />
        </DeckGL>
        
        <div id="tooltip" className="absolute pointer-events-none hidden z-10"></div>
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-gray-800 p-4 rounded-lg text-white text-sm">
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
        
        {/* Controls */}
        <div className="absolute top-4 left-4 bg-gray-800 p-4 rounded-lg text-white">
          <div className="text-sm font-bold mb-2">Map Controls</div>
          <div className="text-xs text-gray-400">
            <div>• Click and drag to pan</div>
            <div>• Scroll to zoom</div>
            <div>• Right-click drag to rotate</div>
            <div>• Hover over sensors for details</div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Map render error:', error);
    setMapError(true);
    return null;
  }
}