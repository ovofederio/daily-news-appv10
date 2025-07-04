import React from 'react';

export default function SettingsPanel({ darkMode, setDarkMode, showSummaries, setShowSummaries }) {
  return (
    <div className="space-x-3">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
      >
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
      <button
        onClick={() => setShowSummaries(!showSummaries)}
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
      >
        {showSummaries ? 'Hide Summaries' : 'Show Summaries'}
      </button>
    </div>
  );
}
