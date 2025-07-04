import React from 'react';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search headlines..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 rounded border border-zinc-300 text-black"
      />
    </div>
  );
}
