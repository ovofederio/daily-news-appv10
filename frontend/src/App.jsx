import React, { useEffect, useState } from 'react';

const categories = ["politics", "sports", "entertainment", "technology","health", ];
const emojiMap = {
  "politics": "🗳️",
  "sports": "🏀",
  "entertainment": "🎬",
  "technology": "🤖",
  "health": "🩺"
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function App() {
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState({});
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    const fetchAll = async () => {
      const result = {};
      for (let topic of categories) {
        try {
          const res = await fetch(`${BACKEND_URL}/api/news?topic=${topic}`);
          const data = await res.json();
          result[topic] = data.headlines || [];
        } catch (err) {
          result[topic] = [];
        }
      }
      setNews(result);
      setLoading(false);
    };

    fetchAll();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleSection = (topic) => {
    setOpenSections(prev => ({ ...prev, [topic]: !prev[topic] }));
  };

  return (
    <div className={`${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-black'} min-h-screen font-sans transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto p-6">
        <div className={`${darkMode ? 'bg-white/10 text-white' : 'bg-zinc-100 text-black'} backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-6 text-center`}>
          <h1 className="text-4xl font-bold mb-2">🗞️ Daily News Digest</h1>
          <p className="text-zinc-400">Top 10 headlines by Category</p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
          >
            Toggle {darkMode ? 'Light' : 'Dark'} Mode 🌓
          </button>
        </div>

        {loading ? (
          <div className="text-center text-zinc-400">Loading news...</div>
        ) : (
          categories.map((topic) => (
            <div key={topic} className="mb-8">
              <button
                onClick={() => toggleSection(topic)}
                className="text-2xl font-bold flex justify-between w-full mb-4"
              >
                <span>{emojiMap[topic]} {topic.toUpperCase()}</span>
                <span>{openSections[topic] ? '▲' : '▼'}</span>
              </button>
              {openSections[topic] && (
                <div className="grid gap-4">
                  {news[topic]?.map((item, i) => (
                    <div key={i} className={`${darkMode ? 'bg-white/10 text-white' : 'bg-zinc-100 text-black'} backdrop-blur-md rounded-xl p-4 shadow border border-white/10`}>
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm mb-2">{item.summary}</p>
                      <div className="text-sm space-x-3 text-blue-500">
                        <a href={`https://www.tiktok.com/search?q=${encodeURIComponent(item.title)}`} target="_blank" rel="noopener noreferrer">TikTok</a>
                        <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title)}`} target="_blank" rel="noopener noreferrer">YouTube</a>
                        <a href={`https://www.instagram.com/explore/tags/${encodeURIComponent(item.title)}`} target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">Source</a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
