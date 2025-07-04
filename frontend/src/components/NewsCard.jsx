import React, { useState, useEffect } from 'react';

export default function NewsCard({ article, isFavorited, toggleFavorite, showSummary }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`transition-all duration-300 transform ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow border border-white/20`}>
      <h3 className="text-lg font-bold mb-1">{article.title}</h3>
      {showSummary && <p className="text-sm mb-2 text-zinc-200">{article.summary}</p>}
      <div className="text-sm space-x-3 mb-2">
        <a href={`https://www.tiktok.com/search?q=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer">TikTok</a>
        <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href={`https://www.instagram.com/explore/tags/${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href={article.url} target="_blank" rel="noopener noreferrer">Source</a>
      </div>
      <button
        onClick={toggleFavorite}
        className="text-yellow-400 hover:text-yellow-300 text-sm"
      >
        {isFavorited ? '⭐ Unfavorite' : '☆ Favorite'}
      </button>
    </div>
  );
}
