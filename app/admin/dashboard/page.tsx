'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

type Tab = 'news' | 'notices' | 'gallery' | 'videos';

interface NewsItem    { id: string; content: string; active: boolean; created_at: string; }
interface Notice      { id: string; title: string; image_url: string | null; active: boolean; created_at: string; }
interface GalleryImg  { id: string; url: string; caption: string; album: string; created_at: string; }
interface Video       { id: string; title: string; url: string; created_at: string; }

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('news');

  const [newsList, setNewsList]     = useState<NewsItem[]>([]);
  const [notices, setNotices]       = useState<Notice[]>([]);
  const [gallery, setGallery]       = useState<GalleryImg[]>([]);
  const [videos, setVideos]         = useState<Video[]>([]);

  const [newsInput, setNewsInput]       = useState('');
  const [noticeTitle, setNoticeTitle]   = useState('');
  const [noticeFile, setNoticeFile]     = useState<File | null>(null);
  const [galleryFile, setGalleryFile]   = useState<File | null>(null);
  const [galleryCaption, setGalleryCaption] = useState('');
  const [galleryAlbum, setGalleryAlbum] = useState('');
  const [videoTitle, setVideoTitle]     = useState('');
  const [videoUrl, setVideoUrl]         = useState('');

  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState('');

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') router.push('/admin');
    fetchAll();
  }, [router]);

  const fetchAll = () => Promise.all([fetchNews(), fetchNotices(), fetchGallery(), fetchVideos()]);

  const fetchNews    = async () => { const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false }); if (data) setNewsList(data); };
  const fetchNotices = async () => { const { data } = await supabase.from('notices').select('*').order('created_at', { ascending: false }); if (data) setNotices(data); };
  const fetchGallery = async () => { const { data } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false }); if (data) setGallery(data); };
  const fetchVideos  = async () => { const { data } = await supabase.from('videos').select('*').order('created_at', { ascending: false }); if (data) setVideos(data); };

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const ext  = file.name.split('.').pop();
    const path = `${folder}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('school-media').upload(path, file);
    if (error) { showToast('Upload failed: ' + error.message); return null; }
    return supabase.storage.from('school-media').getPublicUrl(path).data.publicUrl;
  };

  /* ─── NEWS ─────────────────────────────────────────── */
  const addNews = async () => {
    if (!newsInput.trim()) return;
    setLoading(true);
    await supabase.from('news').insert({ content: newsInput.trim(), active: true });
    setNewsInput(''); await fetchNews(); showToast('News item added!');
    setLoading(false);
  };
  const deleteNews  = async (id: string) => { await supabase.from('news').delete().eq('id', id); fetchNews(); };
  const toggleNews  = async (id: string, active: boolean) => { await supabase.from('news').update({ active: !active }).eq('id', id); fetchNews(); };

  /* ─── NOTICES ───────────────────────────────────────── */
  const addNotice = async () => {
    if (!noticeTitle.trim() && !noticeFile) return;
    setLoading(true);
    let imageUrl: string | null = null;
    if (noticeFile) imageUrl = await uploadFile(noticeFile, 'notices');
    await supabase.from('notices').insert({ title: noticeTitle.trim(), image_url: imageUrl, active: false });
    setNoticeTitle(''); setNoticeFile(null);
    await fetchNotices(); showToast('Notice added!');
    setLoading(false);
  };
  const deleteNotice = async (id: string) => { await supabase.from('notices').delete().eq('id', id); fetchNotices(); };
  const activateNotice = async (id: string, currentlyActive: boolean) => {
    if (!currentlyActive) {
      await supabase.from('notices').update({ active: false }).not('id', 'is', null);
      await supabase.from('notices').update({ active: true }).eq('id', id);
    } else {
      await supabase.from('notices').update({ active: false }).eq('id', id);
    }
    fetchNotices();
  };

  /* ─── GALLERY ──────────────────────────────────────── */
  const addGalleryImage = async () => {
    if (!galleryFile) return;
    setLoading(true);
    const url = await uploadFile(galleryFile, 'gallery');
    if (url) {
      await supabase.from('gallery_images').insert({ url, caption: galleryCaption, album: galleryAlbum || 'General' });
      setGalleryFile(null); setGalleryCaption(''); setGalleryAlbum('');
      await fetchGallery(); showToast('Image uploaded!');
    }
    setLoading(false);
  };
  const deleteImage = async (id: string) => { await supabase.from('gallery_images').delete().eq('id', id); fetchGallery(); };

  /* ─── VIDEOS ───────────────────────────────────────── */
  const addVideo = async () => {
    if (!videoTitle.trim() || !videoUrl.trim()) return;
    setLoading(true);
    await supabase.from('videos').insert({ title: videoTitle.trim(), url: videoUrl.trim() });
    setVideoTitle(''); setVideoUrl('');
    await fetchVideos(); showToast('Video added!');
    setLoading(false);
  };
  const deleteVideo = async (id: string) => { await supabase.from('videos').delete().eq('id', id); fetchVideos(); };

  const tabs = [
    { key: 'news'    as Tab, label: 'News Ticker', icon: '📢', count: newsList.length },
    { key: 'notices' as Tab, label: 'Notices',     icon: '📌', count: notices.length },
    { key: 'gallery' as Tab, label: 'Gallery',     icon: '🖼️', count: gallery.length },
    { key: 'videos'  as Tab, label: 'Videos',      icon: '🎥', count: videos.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-green-300 text-xs mt-0.5">GBPS D-1 Area — Content Manager</p>
        </div>
        <button
          onClick={() => { localStorage.removeItem('isAdmin'); router.push('/admin'); }}
          className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-green-700 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium">
          ✓ {toast}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="grid grid-cols-4 gap-2 bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl text-sm font-medium transition-all ${
                tab === t.key ? 'bg-green-800 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{t.icon}</span>
              <span className="hidden sm:block text-xs">{t.label}</span>
              <span className={`text-xs font-bold ${tab === t.key ? 'text-green-300' : 'text-gray-400'}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── NEWS TAB ── */}
        {tab === 'news' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-gray-800 mb-4">Add News Ticker Item</h2>
              <div className="flex gap-2">
                <input
                  value={newsInput}
                  onChange={(e) => setNewsInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addNews()}
                  placeholder="Type news headline and press Enter…"
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={addNews}
                  disabled={loading || !newsInput.trim()}
                  className="bg-green-700 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-40"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 font-semibold text-gray-800 text-sm">
                Current items ({newsList.length})
              </div>
              {newsList.length === 0
                ? <div className="p-10 text-center text-gray-400 text-sm">No news items yet.</div>
                : <ul className="divide-y divide-gray-50">
                    {newsList.map((item) => (
                      <li key={item.id} className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50">
                        <button
                          onClick={() => toggleNews(item.id, item.active)}
                          title={item.active ? 'Click to hide' : 'Click to show'}
                          className={`w-10 h-5 rounded-full shrink-0 transition-colors ${item.active ? 'bg-green-500' : 'bg-gray-300'}`}
                        />
                        <span className={`flex-1 text-sm ${item.active ? 'text-gray-800' : 'text-gray-400 line-through'}`}>
                          {item.content}
                        </span>
                        <button onClick={() => deleteNews(item.id)} className="text-red-400 hover:text-red-600 text-xs shrink-0">Delete</button>
                      </li>
                    ))}
                  </ul>
              }
            </div>
          </div>
        )}

        {/* ── NOTICES TAB ── */}
        {tab === 'notices' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-gray-800 mb-1">Add Announcement / Notice</h2>
              <p className="text-xs text-gray-400 mb-4">Only one notice can be active (shown as popup on homepage) at a time.</p>
              <div className="space-y-3">
                <input
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  placeholder="Notice title (optional)"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <label
                  htmlFor="notice-file"
                  className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-green-400 transition"
                >
                  {noticeFile
                    ? <span className="text-green-700 text-sm font-medium">✓ {noticeFile.name}</span>
                    : <>
                        <span className="text-3xl">📎</span>
                        <span className="text-gray-400 text-sm">Click to upload image (JPG, PNG, etc.)</span>
                      </>
                  }
                  <input id="notice-file" type="file" accept="image/*" className="hidden"
                    onChange={(e) => setNoticeFile(e.target.files?.[0] || null)} />
                </label>
                <button
                  onClick={addNotice}
                  disabled={loading || (!noticeTitle.trim() && !noticeFile)}
                  className="w-full bg-green-700 hover:bg-green-600 text-white py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-40"
                >
                  {loading ? 'Uploading…' : 'Add Notice'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 font-semibold text-gray-800 text-sm">
                Notices ({notices.length})
              </div>
              {notices.length === 0
                ? <div className="p-10 text-center text-gray-400 text-sm">No notices yet.</div>
                : <ul className="divide-y divide-gray-50">
                    {notices.map((n) => (
                      <li key={n.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                        {n.image_url && (
                          <Image src={n.image_url} alt={n.title} width={64} height={48}
                            className="w-16 h-12 object-cover rounded-lg shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{n.title || 'Untitled'}</p>
                          <p className="text-xs text-gray-400">{new Date(n.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            onClick={() => activateNotice(n.id, n.active)}
                            title={n.active ? 'Active — click to hide' : 'Click to set as active popup'}
                            className={`w-11 h-6 rounded-full transition-colors ${n.active ? 'bg-green-500' : 'bg-gray-300'}`}
                          />
                          <button onClick={() => deleteNotice(n.id)} className="text-red-400 hover:text-red-600 text-xs">Delete</button>
                        </div>
                      </li>
                    ))}
                  </ul>
              }
            </div>
          </div>
        )}

        {/* ── GALLERY TAB ── */}
        {tab === 'gallery' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-gray-800 mb-4">Upload Image</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={galleryAlbum}
                    onChange={(e) => setGalleryAlbum(e.target.value)}
                    placeholder="Album name (e.g. Sports Day)"
                    className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    value={galleryCaption}
                    onChange={(e) => setGalleryCaption(e.target.value)}
                    placeholder="Caption (optional)"
                    className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <label
                  htmlFor="gallery-file"
                  className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-8 cursor-pointer hover:border-green-400 transition"
                >
                  {galleryFile
                    ? <span className="text-green-700 text-sm font-medium">✓ {galleryFile.name}</span>
                    : <>
                        <span className="text-4xl">🖼️</span>
                        <span className="text-gray-400 text-sm">Click to select image</span>
                      </>
                  }
                  <input id="gallery-file" type="file" accept="image/*" className="hidden"
                    onChange={(e) => setGalleryFile(e.target.files?.[0] || null)} />
                </label>
                <button
                  onClick={addGalleryImage}
                  disabled={loading || !galleryFile}
                  className="w-full bg-green-700 hover:bg-green-600 text-white py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-40"
                >
                  {loading ? 'Uploading…' : 'Upload Image'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 font-semibold text-gray-800 text-sm">
                Uploaded images ({gallery.length})
              </div>
              {gallery.length === 0
                ? <div className="p-10 text-center text-gray-400 text-sm">No images uploaded yet.</div>
                : <div className="p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {gallery.map((img) => (
                      <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100">
                        <Image src={img.url} alt={img.caption || 'Gallery'} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-1 p-1">
                          <span className="text-white text-xs text-center font-medium leading-tight">{img.album}</span>
                          <button
                            onClick={() => deleteImage(img.id)}
                            className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full mt-1"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
              }
            </div>
          </div>
        )}

        {/* ── VIDEOS TAB ── */}
        {tab === 'videos' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-gray-800 mb-1">Add Video</h2>
              <p className="text-xs text-gray-400 mb-4">Paste a YouTube link or any direct video URL.</p>
              <div className="space-y-3">
                <input
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Video title"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={addVideo}
                  disabled={loading || !videoTitle.trim() || !videoUrl.trim()}
                  className="w-full bg-green-700 hover:bg-green-600 text-white py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-40"
                >
                  Add Video
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 font-semibold text-gray-800 text-sm">
                Videos ({videos.length})
              </div>
              {videos.length === 0
                ? <div className="p-10 text-center text-gray-400 text-sm">No videos added yet.</div>
                : <ul className="divide-y divide-gray-50">
                    {videos.map((v) => (
                      <li key={v.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                        <span className="text-2xl shrink-0">🎥</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800">{v.title}</p>
                          <p className="text-xs text-gray-400 truncate">{v.url}</p>
                        </div>
                        <button onClick={() => deleteVideo(v.id)} className="text-red-400 hover:text-red-600 text-xs shrink-0">Delete</button>
                      </li>
                    ))}
                  </ul>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
