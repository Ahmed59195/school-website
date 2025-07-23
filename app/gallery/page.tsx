// app/gallery/page.tsx
'use client';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useState } from 'react';

const images = [
  { src: '/gallery/image1.jpg', alt: 'Annual Function' },
  { src: '/gallery/image2.jpg', alt: 'Class Activity' },
  { src: '/gallery/image3.jpg', alt: 'Sports Day' },
  { src: '/gallery/image4.jpg', alt: 'Science Exhibition' },
];

export default function GalleryPage() {
  const [index, setIndex] = useState(-1);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">📷 School Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
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
        slides={images}
        index={index}
      />
    </div>
  );
}
