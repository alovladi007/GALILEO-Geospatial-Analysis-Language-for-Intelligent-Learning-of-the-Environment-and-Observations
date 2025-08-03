import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Applications() {
  return (
    <>
      <Head>
        <title>Applications | GALILEO</title>
      </Head>
      <Navbar />
      <main className="bg-dark text-white min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-4">Applications</h1>
        <ul className="list-disc ml-6 space-y-2 text-gray-300">
          <li>Environmental Monitoring and Forecasting</li>
          <li>Urban Planning and Infrastructure Development</li>
          <li>Climate Risk Analysis and Mitigation</li>
          <li>Defense and Strategic Surveillance</li>
          <li>Oceanographic and Agricultural Intelligence</li>
        </ul>
      </main>
      <Footer />
    </>
  );
}