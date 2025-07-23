'use client';

import { useState } from 'react';
import Image from 'next/image';
import EventCard from '@/components/EventCard';

const events = [
  {
    title: 'یوم آزادی کی تقریبات',
    date: '14 اگست 2025',
    description: 'پاکستان کے یومِ آزادی کے موقع پر خصوصی اسمبلی اور تقریبات منعقد کی جائیں گی۔',
  },
  {
    title: 'نصاب کے وسط کے امتحانات',
    date: '1–10 اکتوبر 2025',
    description: 'تمام کلاسز کے وسط مدتی امتحانات کا انعقاد کیا جائے گا۔',
  },
  {
    title: 'سپورٹس ڈے',
    date: '20 نومبر 2025',
    description: 'تمام جماعتوں کے لیے تفریحی آؤٹ ڈور گیمز اور مقابلے منعقد ہوں گے۔',
  },
];

export default function Home() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <main className="space-y-16 relative">

      {/* Popup Image Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="relative max-w-md w-[90%]">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
              aria-label="Close"
            >
              ❌
            </button>
            <Image
              src="/announcement.jpeg"
              alt="Announcement"
              width={600}
              height={400}
              className="w-full h-140 rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative w-full h-[60vh]">
        <Image
          src="/images/school1.jpeg"
          alt="School Background"
          height={400}
          width={400}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold border-black">
              GBPS D-1 Area
            </h1>
            <p className="mt-2 text-lg md:text-xl border-black">
              Inspiring Young Minds — روشن خیال نسل کی تعمیر
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">📸 School Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Image src="/school-bg.jpg" alt="Gallery 1" width={400} height={300} className="w-full h-auto rounded-lg" />
          <Image src="/school4.jpeg" alt="Gallery 2" width={400} height={300} className="w-full h-auto rounded-lg" />
          <Image src="/school-bg1.jpg" alt="Gallery 3" width={400} height={300} className="w-full h-auto rounded-lg" />
        </div>
        
      </section>

      {/* Events Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">📅 اہم تقریبات</h2>
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
    </main>
    
  );
}
