export default function SimpleMap() {
  return (
    <div className="w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 opacity-50"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <svg className="w-32 h-32 mx-auto text-blue-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">Interactive Map View</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            The 3D geospatial visualization will display real-time data layers, 
            satellite imagery, and sensor information in an interactive map interface.
          </p>
          
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="bg-gray-800 p-4 rounded">
              <div className="text-3xl font-bold text-blue-400">42</div>
              <div className="text-sm text-gray-400">Active Sensors</div>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <div className="text-3xl font-bold text-green-400">98%</div>
              <div className="text-sm text-gray-400">Coverage</div>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <div className="text-3xl font-bold text-purple-400">7</div>
              <div className="text-sm text-gray-400">Data Layers</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 bg-gray-800 p-2 rounded text-xs text-gray-400">
        Lat: 0.000, Lng: 0.000 | Zoom: 1.5
      </div>
    </div>
  );
}