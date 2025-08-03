import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SimpleMap from '../components/SimpleMap';

const DeckGLMap = dynamic(() => import('../components/DeckGLMap'), { 
  ssr: false,
  loading: () => <SimpleMap />
});

export default function MapPage() {
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    // Add error handler for map loading issues
    window.addEventListener('error', (e) => {
      if (e.message && e.message.includes('deck.gl')) {
        setMapError(true);
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>3D Map | GALILEO</title>
      </Head>
      <Navbar />
      <main className="bg-dark text-white min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-4">Interactive 3D Geospatial Map</h1>
        {mapError ? <SimpleMap /> : <DeckGLMap />}
      </main>
      <Footer />
    </>
  );
}