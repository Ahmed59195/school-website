'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import EventCard from '@/components/EventCard';
import NewsTicker from '@/components/NewsTicker';

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
    title: 'سائنسی نمائش',
    date: '20 نومبر 2025',
    description: 'سکول میں سائنس نمائش کا انعقاد کیا جائے گا۔',
  },
];

const newsItems = [
  '🌟 داخلے جاری ہیں - ابھی اپلائی کریں!',
  '🎉 یومِ آزادی کی تیاریاں شروع!',
  '📢 نیا تعلیمی سیشن 1 اگست سے شروع ہوگا',
  '📝 طلباء میں درسی کتابیں تقسیم کر دی گئی ہیں۔',
  '📷 نئی تصویری گیلری اپڈیٹ ہو گئی ہے',
];

export default function Home() {
  const messages = [
    "Inspiring Young Minds — روشن خیال نسل کی تعمیر",
    "Welcome to GBPS D-1 Area!",
    "!خوش آمدید",
    "Learn, Grow, Succeed — !سیکھو، بڑھو، کامیاب ہو",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(true);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    const newsInterval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 4000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(newsInterval);
    };
  }, []);

  return (
    <main className="space-y-16 relative">
      <div className="w-full md:w-auto px-4 md:px-0 mb-6 md:mb-0 md:col-span-1">
  <h2 className="text-lg font-bold mb-2">📢 News & Events</h2>
  <NewsTicker />
</div>

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
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Hero + News Ticker Section */}
      <section className="relative w-full h-auto flex flex-col lg:flex-row">
        {/* Hero Image */}
        <div className="w-full lg:w-[80%] relative h-[60vh]">
       <video
  autoPlay
  muted
  loop
  playsInline
  className="object-cover w-full h-full"
>
  <source src="/school-video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">GBPS D-1 Area</h1>
              <p className="text-lg md:text-xl font-semibold transition-opacity duration-700 ease-in-out">
                {messages[currentMessageIndex]}
              </p>
            </div>
          </div>
        </div>

        {/* Vertical News Ticker */}
        <div className="w-full lg:w-[20%] border-t lg:border-t-0 lg:border-l border-gray-300 bg-white">
          <div className="text-center font-bold text-green-700 py-2 border-b border-gray-200 bg-green-100">
            📢 تازہ خبریں
          </div>
          <div className="h-[60px] flex items-center justify-center px-2 text-sm font-medium text-gray-700 animate-pulse text-center lg:text-right">
            {newsItems[currentNewsIndex]}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">📸 School Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Image src="/school-bg.jpg" alt="Gallery 1" width={400} height={300} className="w-full h-auto rounded-lg" />
          <Image src="/school4.jpeg" alt="Gallery 2" width={400} height={300} className="w-full h-auto rounded-lg" />
          <Image src="/school-bg1.jpg" alt="Gallery 3" width={400} height={300} className="w-full h-auto rounded-lg" />
        </div>
      </section>

      {/* Events Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">📅 اہم تقریبات</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
