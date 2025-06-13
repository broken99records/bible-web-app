'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { loadBibleData } from "./utils/loadBibleData";

// Defines the book names for the Bible
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

let debounceTimer = null;

export default function Home() {

   const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);

   useEffect(() => {
    async function loadData() {
      const verses = await loadBibleData(bookNames);
      const fuseInstance = new Fuse(verses, {
        keys: ["text"],
        threshold: 0.4, // lower = stricter match
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
      console.log(`Search executed for: ( ${q} ) at ${new Date().toLocaleTimeString()}`);
      //console.timeLog("Search Time");
    }, 300); // 300ms debounce
  };


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-2 pb-20 gap-4 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className=""
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <form class="w-full">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>

            <input
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search "
              autoComplete="off"
              onChange={handleSearch}
              value={query}
            />
            <button
              type="submit"
              class="text-white absolute hidden end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>


        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className={`mb-2 tracking-[-.01em] ${results.length > 0 ? 'hidden' : 'text-blue-500'} `}>
            Get started by editing search bar...
          </li>
          <li className={`mb-2 tracking-[-.01em] ${results.length > 0 ? 'hidden' : 'text-blue-500'} `}>
            See your results instantly.
          </li>

          
        {results.map((res, idx) => (
          <li key={idx} style={{ marginBottom: "1rem" }}>
            <strong>
              {res.book} {res.chapter}:{res.verse}
            </strong>{" "}
            — {res.text}
          </li>
        ))}
      
        </ol>

      </main>
  
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        
      </footer>
    </div>
  );
}
