import React from 'react';

export default function Favorites({ favorites }) {
  const starred = Object.entries(favorites).filter(([_, val]) => val);

  if (starred.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">⭐ Favorites</h2>
      <ul className="list-disc list-inside text-sm">
        {starred.map(([title], i) => (
          <li key={i}>{title}</li>
        ))}
      </ul>
    </div>
  );
}
