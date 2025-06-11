export async function loadBibleData(books) {
  const allVerses = [];

  for (const book of books) {
    const res = await fetch(`/data/${book}.json`);
    const json = await res.json();

    const verses = json
      .filter(item => item.type === 'paragraph text')
      .map(item => ({
        text: item.value,
        chapter: item.chapterNumber,
        verse: item.verseNumber,
        book,
      }));

    allVerses.push(...verses);
  }

  return allVerses;
}
