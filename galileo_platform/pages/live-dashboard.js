import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LiveDashboard() {
  return (
    <>
      <Head>
        <title>Sensor Dashboard | GALILEO</title>
      </Head>
      <Navbar />
      <main className="bg-dark text-white min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-6">Live Sensor & Telemetry Dashboard</h1>
        <iframe
          src="https://charts.mongodb.com/charts-project-0-jyxwb/embed/charts?id=some-demo-id&theme=dark"
          className="w-full h-[500px] rounded border border-gray-600"
        />
        <p className="mt-4 text-gray-400 text-sm">
          Data visualization is mock-linked to a sample embed. Replace with real Grafana or custom D3.js interfaces.
        </p>
      </main>
      <Footer />
    </>
  );
}