'use client';
import Image from 'next/image';
import Link from 'next/link';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface GalleryImg { id: string; url: string; caption: string; album: string; }

export default function DynamicAlbumPage() {
  const params    = useParams<{ album: string }>();
  const albumName = decodeURIComponent(params.album);

  const [images, setImages] = useState<GalleryImg[]>([]);
  const [index, setIndex]   = useState(-1);

  useEffect(() => {
    supabase
      .from('gallery_images')
      .select('*')
      .eq('album', albumName)
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setImages(data); });
  }, [albumName]);

  return (
    <div>
      <div className="bg-green-900 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-2">📂 {albumName}</h1>
        <Link href="/gallery" className="text-green-300 hover:text-white text-sm transition-colors">
          ← Back to Gallery
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {images.length === 0
          ? <div className="text-center text-gray-400 py-20 text-sm">No images found in this album.</div>
          : <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, i) => (
                  <div key={img.id} className="cursor-pointer rounded-xl overflow-hidden shadow-md group" onClick={() => setIndex(i)}>
                    <Image
                      src={img.url}
                      alt={img.caption || albumName}
                      width={600}
                      height={400}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {img.caption && (
                      <div className="p-2 text-xs text-gray-500 text-center">{img.caption}</div>
                    )}
                  </div>
                ))}
              </div>
              <Lightbox
                open={index >= 0}
                close={() => setIndex(-1)}
                slides={images.map((img) => ({ src: img.url }))}
                index={index}
              />
            </>
        }
      </div>
    </div>
  );
}
