import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SimpleMap from '../components/SimpleMap';

const SensorMap = dynamic(() => import('../components/SensorMap'), { 
  ssr: false,
  loading: () => <SimpleMap />
});

const InteractiveMap = dynamic(() => import('../components/InteractiveMap'), { 
  ssr: false,
  loading: () => <SimpleMap />
});

export default function MapPage() {
  const [mapType, setMapType] = useState('interactive');

  return (
    <>
      <Head>
        <title>3D Map | GALILEO</title>
      </Head>
      <Navbar />
      <main className="bg-dark text-white min-h-screen p-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Interactive Geospatial Map</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setMapType('interactive')}
              className={`px-4 py-2 rounded ${
                mapType === 'interactive' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Canvas View
            </button>
            <button
              onClick={() => setMapType('3d')}
              className={`px-4 py-2 rounded ${
                mapType === '3d' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              3D View
            </button>
          </div>
        </div>
        
        {mapType === 'interactive' ? <InteractiveMap /> : <SensorMap />}
      </main>
      <Footer />
    </>
  );
}