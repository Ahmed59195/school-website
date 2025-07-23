// app/gallery/independence-day/page.tsx
'use client';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useState } from 'react';

const idImages = [
  { src: '/images/pak/pak1 (1).jpeg', alt: 'Independence Day' },
  { src: '/images/pak/pak1 (2).jpeg', alt: 'Independence Day' },
  { src: '/images/pak/pak1 (3).jpeg', alt: 'Independence Day' },
  { src: '/images/pak/pak1 (4).jpeg', alt: 'Independence Day' },
  { src: '/images/pak/pak1 (5).jpeg', alt: 'Independence Day' },
  { src: '/images/pak/pak1 (6).jpeg', alt: 'Independence Day' },
  { src: '/images/pak/pak1 (7).jpeg', alt: 'Independence Day' },
  { src: '/images/pak/pak1 (8).jpeg', alt: 'Independence Day' },
  { src: '/images/pak/pak1 (9).jpeg', alt: 'Independence Day' },
  { src: '/images/pak/pak1 (10).jpeg', alt: 'Independence Day' },
  { src: '/images/pak/pak1 (11).jpeg', alt: 'Independence Day' },
  { src: '/images/pak/pak1 (12).jpeg', alt: 'Independence Day' },
  // Add more images as needed
];

export default function IndependenceDayGallery() {
  const [index, setIndex] = useState(-1);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">🇵🇰 Independence Day</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {idImages.map((img, i) => (
          <div key={i} className="cursor-pointer" onClick={() => setIndex(i)}>
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={400}
              className="rounded shadow-md hover:scale-105 transition-transform"
            />
          </div>
        ))}
      </div>
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={idImages}
        index={index}
      />
    </div>
  );
}
