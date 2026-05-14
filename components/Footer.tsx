import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const quickLinks = [
  ['Home', '/'],
  ['About', '/about'],
  ['Gallery', '/gallery'],
  ['Admissions', '/admissions'],
  ['Careers', '/careers'],
  ['Contact', '/contact'],
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 mt-16">
      {/* Green top strip */}
      <div className="bg-green-800 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white text-sm font-medium text-center sm:text-left">
            🏫 Government Boys Primary School D-1 Area — Empowering Young Minds
          </p>
          <a
            href="https://wa.me/923422560406"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-sm px-4 py-1.5 rounded-full transition-colors"
          >
            <FaWhatsapp size={15} /> Chat with us
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
              G
            </div>
            <h2 className="text-white font-semibold">GBPS D-1 Area</h2>
          </div>
          <p className="text-sm text-right leading-relaxed mb-2 font-notoUrdu">
            تعلیم، تربیت اور ترقی — ہمارا عزم ہے روشن مستقبل کے لیے
          </p>
          <p className="text-sm leading-relaxed">
            Committed to quality primary education, character building, and community service in Karachi.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 pb-2 border-b border-gray-700">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map(([name, path]) => (
              <li key={path}>
                <Link
                  href={path}
                  className="hover:text-green-400 transition-colors flex items-center gap-2"
                >
                  <span className="text-green-500 text-base leading-none">›</span>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4 pb-2 border-b border-gray-700">Contact Info</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-green-500 mt-0.5 shrink-0" />
              <span>D-1 Area, Malir Town, District Korangi, Karachi, Pakistan</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-green-500 shrink-0" />
              <a href="tel:03422560406" className="hover:text-green-400 transition-colors">
                0342-2560406
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-green-500 shrink-0" />
              <a href="mailto:gbpsd1area@gmail.com" className="hover:text-green-400 transition-colors">
                gbpsd1area@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 shrink-0">🕒</span>
              <span>Monday – Saturday: 8:00 AM – 1:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-600">
        &copy; {new Date().getFullYear()} GBPS D-1 Area. All rights reserved.
      </div>
    </footer>
  );
}
