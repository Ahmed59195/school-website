'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const staticAlbums = [
  { name: '👥 Parents Teachers Meeting', slug: 'ptm',              cover: '/images/ptm/ptm1.jpeg' },
  { name: '🇵🇰 Independence Day',        slug: 'independence-day', cover: '/images/pak/pak1 (1).jpeg' },
];

interface GalleryImg { id: string; url: string; caption: string; album: string; }

export default function GalleryPage() {
  const [dynamicAlbums, setDynamicAlbums] = useState<Record<string, GalleryImg[]>>({});

  useEffect(() => {
    supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (!data) return;
        const grouped = data.reduce((acc: Record<string, GalleryImg[]>, img: GalleryImg) => {
          if (!acc[img.album]) acc[img.album] = [];
          acc[img.album].push(img);
          return acc;
        }, {});
        setDynamicAlbums(grouped);
      });
  }, []);

  const albumEntries = Object.entries(dynamicAlbums);

  return (
    <div>
      <div className="bg-green-900 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-2">📁 School Gallery</h1>
        <p className="text-white/70 text-sm">Photos and memories from GBPS D-1 Area</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Static albums */}
          {staticAlbums.map((album) => (
            <Link key={album.slug} href={`/gallery/${album.slug}`}>
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={album.cover} alt={album.name} width={600} height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 text-base font-semibold text-gray-800 text-center">{album.name}</div>
              </div>
            </Link>
          ))}

          {/* Dynamic albums from admin uploads */}
          {albumEntries.map(([albumName, images]) => (
            <Link key={albumName} href={`/gallery/${encodeURIComponent(albumName)}`}>
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={images[0].url} alt={albumName} width={600} height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                    {images.length} photo{images.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="p-4 text-base font-semibold text-gray-800 text-center">📂 {albumName}</div>
              </div>
            </Link>
          ))}
        </div>

        {albumEntries.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-4">
            Upload images from the admin panel to add more albums.
          </p>
        )}
      </div>
    </div>
  );
}
