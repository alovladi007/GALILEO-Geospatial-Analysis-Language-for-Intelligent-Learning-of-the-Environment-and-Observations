import Head from 'next/head';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DeckGLMap = dynamic(() => import('../components/DeckGLMap'), { ssr: false });

export default function MapPage() {
  return (
    <>
      <Head>
        <title>3D Map | GALILEO</title>
      </Head>
      <Navbar />
      <main className="bg-dark text-white min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-4">Interactive 3D Geospatial Map</h1>
        <DeckGLMap />
      </main>
      <Footer />
    </>
  );
}