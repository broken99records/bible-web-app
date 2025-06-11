"use client";

import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { loadBibleData } from "../utils/loadBibleData";

const bookNames = [
  "genesis",
  "exodus",
  "leviticus",
  "numbers",
  "deuteronomy",
  "joshua",
  "judges",
  "ruth",
  "1samuel",
  "2samuel",
  "1kings",
  "2kings",
  "1chronicles",
  "2chronicles",
  "ezra",
  "nehemiah",
  "esther",
  "job",
  "psalms",
  "proverbs",
  "ecclesiastes",
  "songofsolomon",
  "isaiah",
  "jeremiah",
  "lamentations",
  "ezekiel",
  "daniel",
  "hosea",
  "joel",
  "amos",
  "obadiah",
  "jonah",
  "micah",
  "nahum",
  "habakkuk",
  "zephaniah",
  "haggai",
  "zechariah",
  "malachi",
  "matthew",
  "mark",
  "luke",
  "john",
  "acts",
  "romans",
  "1corinthians",
  "2corinthians",
  "galatians",
  "ephesians",
  "philippians",
  "colossians",
  "1thessalonians",
  "2thessalonians",
  "1timothy",
  "2timothy",
  "titus",
  "philemon",
  "hebrews",
  "james",
  "1peter",
  "2peter",
  "1john",
  "2john",
  "3john",
  "jude",
  "revelation",
];

let debounceTimer = null; // Place this outside the component

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    async function loadData() {
      const verses = await loadBibleData(bookNames);
      const fuseInstance = new Fuse(verses, {
        keys: ["text"],
        threshold: 0.6, // lower = stricter match
      });
      setFuse(fuseInstance);
    }

    loadData();
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value;
    setQuery(q);

    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      if (fuse && q) {
        const searchResults = fuse
          .search(q)
          .map((r) => r.item)
          .slice(0, 10);
        setResults(searchResults);
      } else {
        setResults([]);
      }
      console.log(`Search executed for: ${q}`);
      //console.timeLog("Search Time");
    }, 300); // 300ms debounce
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Bible Verse Search</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a verse..."
        style={{ padding: "0.5rem", width: "100%", marginTop: "1rem" }}
      />

      <ul style={{ marginTop: "1rem" }}>
        {results.map((res, idx) => (
          <li key={idx} style={{ marginBottom: "1rem" }}>
            <strong>
              {res.book} {res.chapter}:{res.verse}
            </strong>{" "}
            — {res.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
