import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#111827] text-white p-4 flex justify-between items-center shadow-md">
      <Link href="/">
        <span className="text-2xl font-black cursor-pointer">GALILEO</span>
      </Link>
      <div className="space-x-4 text-sm uppercase tracking-wide">
        <Link href="/about" className="hover:text-blue-400">About</Link>
        <Link href="/applications" className="hover:text-blue-400">Applications</Link>
        <Link href="/architecture" className="hover:text-blue-400">Architecture</Link>
        <Link href="/map" className="hover:text-blue-400">3D Map</Link>
        <Link href="/live-dashboard" className="hover:text-blue-400">Dashboard</Link>
      </div>
    </nav>
  );
}