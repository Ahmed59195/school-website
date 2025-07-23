// app/gallery/page.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';

const folders = [
  {
    name: '👥 Parents Teachers Meeting',
    slug: 'ptm',
    cover: '/images/ptm/ptm1.jpeg',
  },
  {
  name: '🇵🇰 Independence Day',
  slug: 'independence-day',
  cover: '/images/pak/pak1 (1).jpeg', // change to your actual cover image
},

  // Future folders
  // { name: '🏃‍♂️ Sports Day', slug: 'sports-day', cover: '/images/sports/s1.jpeg' },
];

export default function GalleryFolders() {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">📁 School Gallery Folders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {folders.map((folder) => (
          <Link key={folder.slug} href={`/gallery/${folder.slug}`}>
            <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              <Image
                src={folder.cover}
                alt={folder.name}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-lg font-medium text-center">{folder.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
