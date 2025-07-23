import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* School Info */}
        <div>
          <h2 className="text-lg font-semibold text-white">GBPS D-1 Area</h2>
          <p className="mt-2 text-sm">
            تعلیم، تربیت اور ترقی — ہمارا عزم ہے روشن مستقبل کے لیے
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/admissions">Admissions</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">D-1 Area, Malir Town, District Korangi, Karachi, Pakistan</p>
          <p className="text-sm">Phone: 0342-2560406</p>
          <p className="text-sm">Email: info@gbpsd1.edu.pk</p>
        </div>
      </div>

      <div className="bg-gray-200 text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} GBPS D-1 Area. All rights reserved.
      </div>
    </footer>
  );
}
