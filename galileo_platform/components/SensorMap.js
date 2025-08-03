import { useEffect, useState } from 'react';
import Map from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { api } from '../services/api';

export default function SensorMap() {
  const [sensors, setSensors] = useState([]);
  const [viewState, setViewState] = useState({
    longitude: -95.7129,
    latitude: 37.0902,
    zoom: 3,
    pitch: 30,
    bearing: 0
  });

  useEffect(() => {
    const fetchSensors = async () => {
      const data = await api.getSensors();
      setSensors(data);
    };
    
    fetchSensors();
    const interval = setInterval(fetchSensors, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const layers = [
    // Sensor points
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
        if (info.object) {
          document.getElementById('tooltip').innerHTML = `
            <div class="bg-gray-800 p-2 rounded text-white text-sm">
              <div class="font-bold">${info.object.id}</div>
              <div>Type: ${info.object.type}</div>
              <div>Value: ${info.object.value} ${info.object.unit}</div>
              <div>Location: ${info.object.location[0].toFixed(4)}, ${info.object.location[1].toFixed(4)}</div>
            </div>
          `;
          document.getElementById('tooltip').style.display = 'block';
          document.getElementById('tooltip').style.left = info.x + 'px';
          document.getElementById('tooltip').style.top = info.y + 'px';
        } else {
          document.getElementById('tooltip').style.display = 'none';
        }
      }
    })
  ];

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      <DeckGL
        viewState={viewState}
        onViewStateChange={({viewState}) => setViewState(viewState)}
        controller={true}
        layers={layers}
      >
        <Map
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
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
}