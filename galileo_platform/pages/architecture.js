import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Architecture() {
  return (
    <>
      <Head>
        <title>LLM Architecture | GALILEO</title>
      </Head>
      <Navbar />
      <main className="bg-dark text-white min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-4">GALILEO LLM Architecture</h1>
        <p className="mb-4 text-gray-300">
          The GALILEO platform uses a multi-modal transformer-based model trained on diverse spatial, environmental, and sensor datasets.
          It performs contextual analysis, spatial-temporal reasoning, and predictive analytics across multiple resolutions and geographies.
        </p>
        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>Geo-spatial encoding and multi-resolution fusion layers</li>
          <li>Cross-modal attention for visual, sonar, and textual data</li>
          <li>Language-based query and summarization modules</li>
          <li>Continuous learning from real-time sensor streams</li>
        </ul>
      </main>
      <Footer />
    </>
  );
}