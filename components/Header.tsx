'use client';
import Link from 'next/link';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Admissions', path: '/admissions' },
  { name: 'Contact', path: '/contact' },
  { name: 'Careers', path: '/careers' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top bar */}
      <div className="bg-green-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="hidden sm:block font-medium tracking-wide">
            Government Boys Primary School — D-1 Area, Malir Town, Karachi
          </span>
          <div className="flex gap-5 ml-auto">
            <a
              href="tel:03422560406"
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <FaPhone size={11} /> 0342-2560406
            </a>
            <a
              href="mailto:gbpsd1area@gmail.com"
              className="hidden sm:flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <FaEnvelope size={11} /> gbpsd1area@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-green-800 flex items-center justify-center text-white font-extrabold text-lg shadow-sm group-hover:bg-green-700 transition-colors">
              G
            </div>
            <div>
              <div className="text-base font-bold text-green-900 leading-tight">GBPS D-1 Area</div>
              <div className="text-xs text-gray-500 leading-tight">Excellence in Primary Education</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="px-3 py-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-800 font-medium transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/admin"
              className="ml-3 px-4 py-2 bg-green-800 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm"
            >
              Admin
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 px-4 pb-4 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="flex items-center py-3 text-gray-700 hover:text-green-800 font-medium border-b border-gray-50 text-sm transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/admin"
              className="block mt-3 py-2.5 px-4 bg-green-800 text-white rounded-md text-center font-medium text-sm hover:bg-green-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Admin Portal
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
