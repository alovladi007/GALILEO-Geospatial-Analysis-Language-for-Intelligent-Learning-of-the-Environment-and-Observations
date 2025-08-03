import Head from 'next/head';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>GALILEO | Geospatial AI</title>
      </Head>
      <Navbar />
      <main className="bg-dark min-h-screen">
        <HeroSection />
      </main>
      <Footer />
    </>
  );
}