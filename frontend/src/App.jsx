import React, { useEffect, useState } from 'react';

const categories = ["politics", "sports", "pop culture", "technology"];
const emojiMap = {
  "politics": "🗳️",
  "sports": "🏀",
  "pop culture": "🎬",
  "technology": "🤖"
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function App() {
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white font-sans p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2">🗞️ Daily News Digest</h1>
          <p className="text-zinc-300">Top 10 trending headlines in each category with a glassy look ✨</p>
        </div>

        {loading ? (
          <div className="text-center text-zinc-400">Loading news...</div>
        ) : (
          categories.map((topic) => (
            <div key={topic} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {emojiMap[topic]} {topic.toUpperCase()}
              </h2>
              <div className="grid gap-4">
                {news[topic]?.map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow border border-white/20">
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-200 mb-2">{item.summary}</p>
                    <div className="text-sm space-x-3 text-blue-300">
                      <a href={`https://www.tiktok.com/search?q=${encodeURIComponent(item.title)}`} target="_blank" rel="noopener noreferrer">TikTok</a>
                      <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title)}`} target="_blank" rel="noopener noreferrer">YouTube</a>
                      <a href={`https://www.instagram.com/explore/tags/${encodeURIComponent(item.title.split(" ")[0])}`} target="_blank" rel="noopener noreferrer">Instagram</a>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">Source</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
