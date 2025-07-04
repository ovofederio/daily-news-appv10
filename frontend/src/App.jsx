import React, { useState, useEffect } from 'react';
import NewsCard from './components/NewsCard';
import SearchBar from './components/SearchBar';
import SettingsPanel from './components/SettingsPanel';
import Favorites from './components/Favorites';

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
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites") || '{}'));
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === 'true');
  const [openSections, setOpenSections] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showSummaries, setShowSummaries] = useState(true);

  useEffect(() => {
    categories.forEach(topic => {
      fetch(`${BACKEND_URL}/api/news?topic=${topic}`)
        .then(res => res.json())
        .then(data => {
          setNews(prev => ({ ...prev, [topic]: data.headlines }));
        });
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleFavorite = (title) => {
    setFavorites(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-black'} font-sans`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">🗞️ Daily News Digest</h1>
        <SettingsPanel
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          showSummaries={showSummaries}
          setShowSummaries={setShowSummaries}
        />
      </div>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Favorites favorites={favorites} />

      {categories.map(topic => (
        <div key={topic} className="mb-6">
          <button
            onClick={() => setOpenSections(prev => ({ ...prev, [topic]: !prev[topic] }))}
            className="text-2xl font-bold w-full text-left flex justify-between"
          >
            <span>{emojiMap[topic]} {topic.toUpperCase()}</span>
            <span>{openSections[topic] ? '▲' : '▼'}</span>
          </button>

          {openSections[topic] && (
            <div className="mt-2 space-y-4">
              {(news[topic] || []).filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())).map((item, i) => (
                <NewsCard
                  key={i}
                  article={item}
                  isFavorited={favorites[item.title]}
                  toggleFavorite={() => toggleFavorite(item.title)}
                  showSummary={showSummaries}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
