'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EventCard from '@/components/EventCard';
import { supabase } from '@/lib/supabase';

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

const galleryImages = [
  { src: '/school-bg.jpg',  alt: 'School Building' },
  { src: '/school4.jpeg',   alt: 'School Activity' },
  { src: '/school-bg1.jpg', alt: 'School Campus' },
];

interface Notice { image_url: string | null; title: string; }
interface Video  { id: string; title: string; url: string; }

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
}

export default function Home() {
  const [msgIndex, setMsgIndex]     = useState(0);
  const [popupSrc, setPopupSrc]     = useState<string | null>(null);
  const [popupAlt, setPopupAlt]     = useState('Announcement');
  const [popupOpen, setPopupOpen]   = useState(true);
  const [videos, setVideos]         = useState<Video[]>([]);

  useEffect(() => {
    const interval = setInterval(() => setMsgIndex((p) => (p + 1) % messages.length), 3000);

    // Fetch active notice
    supabase
      .from('notices')
      .select('image_url, title')
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) {
          const n = data[0] as Notice;
          setPopupSrc(n.image_url || '/announcement.jpeg');
          setPopupAlt(n.title || 'Announcement');
        } else {
          setPopupSrc('/announcement.jpeg');
        }
      });

    // Fetch videos
    supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setVideos(data); });

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Announcement Popup */}
      {popupSrc && popupOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setPopupOpen(false)}
              className="absolute top-3 right-3 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
            <Image src={popupSrc} alt={popupAlt} width={600} height={400} className="w-full h-auto" />
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative w-full h-[75vh] min-h-[500px] overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/school-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            🇵🇰 Government Boys Primary School
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">GBPS D-1 Area</h1>
          <p className="text-xl md:text-2xl font-medium text-white/90 mb-8 min-h-[2rem] transition-all duration-500">
            {messages[msgIndex]}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/admissions" className="bg-green-600 hover:bg-green-500 text-white font-semibold px-7 py-3 rounded-full transition-colors shadow-lg">
              Apply for Admission
            </Link>
            <Link href="/about" className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3 rounded-full transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1 rounded-full">Upcoming</span>
          <h2 className="text-3xl font-bold mt-3 text-gray-800">📅 اہم تقریبات</h2>
          <p className="text-gray-500 mt-2 text-sm">Important school events and activities for 2026</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((e, i) => <EventCard key={i} title={e.title} date={e.date} description={e.description} />)}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1 rounded-full">Our School</span>
            <h2 className="text-3xl font-bold mt-3 text-gray-800">📸 School Gallery</h2>
            <p className="text-gray-500 mt-2 text-sm">Glimpses of life at GBPS D-1 Area</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-md aspect-video group">
                <Image src={img.src} alt={img.alt} width={600} height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery" className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-full transition-colors shadow-sm">
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* Videos (only shown when videos exist in DB) */}
      {videos.length > 0 && (
        <section className="max-w-6xl mx-auto py-16 px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1 rounded-full">Media</span>
            <h2 className="text-3xl font-bold mt-3 text-gray-800">🎥 Videos</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => {
              const ytId = getYouTubeId(v.url);
              return (
                <div key={v.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  {ytId
                    ? <iframe
                        src={`https://www.youtube.com/embed/${ytId}`}
                        className="w-full aspect-video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    : <video src={v.url} controls className="w-full aspect-video bg-black" />
                  }
                  <div className="p-4">
                    <p className="font-medium text-gray-800 text-sm">{v.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-green-900 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-3">داخلے جاری ہیں — 2026-27</h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Admissions are open for the new academic session. Enroll your child today and invest in their future.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/admissions" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-full transition-colors shadow-lg">
            Apply Now
          </Link>
          <Link href="/contact" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-8 py-3 rounded-full transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
