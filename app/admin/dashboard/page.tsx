'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [newsList, setNewsList] = useState<string[]>([]);
  const [newNews, setNewNews] = useState('');

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/admin');
    }

    const storedNews = localStorage.getItem('schoolNews');
    if (storedNews) {
      setNewsList(JSON.parse(storedNews));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin');
  };

  const handleAddNews = () => {
    if (newNews.trim() === '') return;

    const updatedNews = [newNews, ...newsList];
    setNewsList(updatedNews);
    localStorage.setItem('schoolNews', JSON.stringify(updatedNews));
    setNewNews('');
  };

  const handleDeleteNews = (index: number) => {
    const updatedNews = [...newsList];
    updatedNews.splice(index, 1);
    setNewsList(updatedNews);
    localStorage.setItem('schoolNews', JSON.stringify(updatedNews));
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* News Section */}
      <section className="bg-white p-6 rounded shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add News</h2>
        <div className="flex gap-2 mb-4">
          <input
            value={newNews}
            onChange={(e) => setNewNews(e.target.value)}
            type="text"
            placeholder="Enter news headline..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleAddNews}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* News List */}
        <ul className="space-y-2">
          {newsList.map((news, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
              <span>{news}</span>
              <button
                onClick={() => handleDeleteNews(index)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
