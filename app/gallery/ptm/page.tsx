// app/gallery/ptm/page.tsx
'use client';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useState } from 'react';

const ptmImages = [
  { src: '/images/ptm/ptm1.jpeg', alt: 'Parents Teachers Meeting' },
  { src: '/images/ptm/ptm2.jpeg', alt: 'Parents Teachers Meeting' },
  { src: '/images/ptm/ptm3.jpeg', alt: 'Parents Teachers Meeting' },
  { src: '/images/ptm/ptm4.jpeg', alt: 'Parents Teachers Meeting' },
  { src: '/images/ptm/ptm5.jpeg', alt: 'Parents Teachers Meeting' },
  { src: '/images/ptm/ptm6.jpeg', alt: 'Parents Teachers Meeting' },
  { src: '/images/ptm/ptm7.jpeg', alt: 'Parents Teachers Meeting' },
  { src: '/images/ptm/ptm8.jpeg', alt: 'Parents Teachers Meeting' },
];

export default function PTMGalleryPage() {
  const [index, setIndex] = useState(-1);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">👥 Parents Teachers Meeting</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ptmImages.map((img, i) => (
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
        slides={ptmImages}
        index={index}
      />
    </div>
  );
}
