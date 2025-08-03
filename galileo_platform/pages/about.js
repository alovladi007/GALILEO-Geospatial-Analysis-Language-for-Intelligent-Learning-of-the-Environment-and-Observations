import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Head>
        <title>About | GALILEO</title>
      </Head>
      <Navbar />
      <main className="bg-dark text-white min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-4">About GALILEO</h1>
        <p className="max-w-2xl text-gray-300">
          GALILEO is a powerful geospatial AI platform built on a custom Language Model tailored to analyze,
          interpret, and predict environmental changes across the globe.
          Our mission is to bridge the gap between raw geo-data and actionable intelligence using advanced AI.
        </p>
      </main>
      <Footer />
    </>
  );
}