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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Sensor Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Temperature Sensors</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex justify-between">
                <span>Humidity Sensors</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex justify-between">
                <span>Pressure Sensors</span>
                <span className="text-yellow-400">Warning</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Real-time Metrics</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Data Points/sec</span>
                <span className="text-blue-400">1,234</span>
              </div>
              <div className="flex justify-between">
                <span>Active Streams</span>
                <span className="text-blue-400">42</span>
              </div>
              <div className="flex justify-between">
                <span>Latency</span>
                <span className="text-green-400">12ms</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">System Health</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>CPU Usage</span>
                <span className="text-green-400">45%</span>
              </div>
              <div className="flex justify-between">
                <span>Memory</span>
                <span className="text-green-400">62%</span>
              </div>
              <div className="flex justify-between">
                <span>Storage</span>
                <span className="text-yellow-400">78%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Live Data Visualization</h3>
          <div className="h-64 bg-gray-900 rounded flex items-center justify-center text-gray-500">
            <p>Real-time charts will be displayed here</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}