'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EventCard from '@/components/EventCard';

const messages = [
  "Inspiring Young Minds",
  "Welcome to GBPS D-1 Area!",
  "روشن خیال نسل کی تعمیر",
  "Learn · Grow · Succeed",
];

const events = [
  {
    title: 'یوم آزادی کی تقریبات',
    date: '14 اگست 2026',
    description: 'پاکستان کے یومِ آزادی کے موقع پر خصوصی اسمبلی اور تقریبات منعقد کی جائیں گی۔',
  },
  {
    title: 'نصاب کے وسط کے امتحانات',
    date: '1–10 اکتوبر 2026',
    description: 'تمام کلاسز کے وسط مدتی امتحانات کا انعقاد کیا جائے گا۔',
  },
  {
    title: 'سائنسی نمائش',
    date: '20 نومبر 2026',
    description: 'سکول میں سائنس نمائش کا انعقاد کیا جائے گا۔',
  },
];

const stats = [
  { label: 'Students', value: '500+' },
  { label: 'Teachers', value: '12' },
  { label: 'Classes', value: 'ECE–V' },
  { label: 'Years of Service', value: '30+' },
];

const galleryImages = [
  { src: '/school-bg.jpg', alt: 'School Building' },
  { src: '/school4.jpeg', alt: 'School Activity' },
  { src: '/school-bg1.jpg', alt: 'School Campus' },
];

export default function Home() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Announcement Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
            <Image
              src="/announcement.jpeg"
              alt="Announcement"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative w-full h-[75vh] min-h-[500px] overflow-hidden">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/school-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            🇵🇰 Government Boys Primary School
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            GBPS D-1 Area
          </h1>
          <p className="text-xl md:text-2xl font-medium text-white/90 mb-8 min-h-[2rem] transition-all duration-500">
            {messages[currentMessageIndex]}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/admissions"
              className="bg-green-600 hover:bg-green-500 text-white font-semibold px-7 py-3 rounded-full transition-colors shadow-lg"
            >
              Apply for Admission
            </Link>
            <Link
              href="/about"
              className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3 rounded-full transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-green-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold text-amber-400">{stat.value}</div>
              <div className="text-sm text-white/80 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1 rounded-full">
            Upcoming
          </span>
          <h2 className="text-3xl font-bold mt-3 text-gray-800">📅 اہم تقریبات</h2>
          <p className="text-gray-500 mt-2 text-sm">Important school events and activities for 2026</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              date={event.date}
              description={event.description}
            />
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1 rounded-full">
              Our School
            </span>
            <h2 className="text-3xl font-bold mt-3 text-gray-800">📸 School Gallery</h2>
            <p className="text-gray-500 mt-2 text-sm">Glimpses of life at GBPS D-1 Area</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-md aspect-video group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-full transition-colors shadow-sm"
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-900 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-3">داخلے جاری ہیں — 2026-27</h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Admissions are open for the new academic session. Enroll your child today and invest in their future.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/admissions"
            className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-full transition-colors shadow-lg"
          >
            Apply Now
          </Link>
          <Link
            href="/contact"
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-8 py-3 rounded-full transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
