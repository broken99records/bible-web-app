'use client'

import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { loadBibleData } from '../utils/loadBibleData';

const bookNames = [
  '2samuel',
  '2thessalonians',
  '2timothy',
  '3john',
  'acts',
  'amos',
  'colossians',
  'daniel',
  'deuteronomy',
  'ecclesiastes',
  'ephesians',
  'esther',
  'exodus',
  'ezekiel',
  'ezra',
  'galatians'
  // Add more as needed
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    async function loadData() {
      const verses = await loadBibleData(bookNames);
      const fuseInstance = new Fuse(verses, {
        keys: ['text'],
        threshold: 0.4, // lower = stricter match
      });
      setFuse(fuseInstance);
    }

    loadData();
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value;
    setQuery(q);

    if (fuse && q) {
      const searchResults = fuse.search(q).map((r) => r.item);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Bible Verse Search</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a verse..."
        style={{ padding: '0.5rem', width: '100%', marginTop: '1rem' }}
      />

      <ul style={{ marginTop: '1rem' }}>
        {results.map((res, idx) => (
          <li key={idx} style={{ marginBottom: '1rem' }}>
            <strong>{res.book} {res.chapter}:{res.verse}</strong> — {res.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
