import Head from 'next/head';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LiveDataDashboard = dynamic(() => import('../components/LiveDataDashboard'), { 
  ssr: false,
  loading: () => <div className="text-gray-400 p-10">Loading dashboard...</div>
});

export default function LiveDashboard() {
  return (
    <>
      <Head>
        <title>Sensor Dashboard | GALILEO</title>
      </Head>
      <Navbar />
      <main className="bg-dark text-white min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-6">Live Sensor & Telemetry Dashboard</h1>
        <LiveDataDashboard />
      </main>
      <Footer />
    </>
  );
}