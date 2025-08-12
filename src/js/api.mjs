const GOOGLE_BASE = "https://www.googleapis.com/books/v1/volumes";
const QUOTABLE = "https://api.quotable.io/random";

// Search books by query
export async function searchBooks(q, maxResults = 12) {
  const url = `${GOOGLE_BASE}?q=${encodeURIComponent(q)}&maxResults=${maxResults}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Google Books API error");
  const json = await res.json();
  return json.items || [];
}

// Get a single book by ID
export async function getBookById(id) {
  const res = await fetch(`${GOOGLE_BASE}/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error("Google Books API error");
  return res.json();
}

// Fetch a random quote from Quotable
export async function fetchQuote() {
  try {
    const res = await fetch(QUOTABLE);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Fetch local categories JSON file
export async function fetchCategoriesJson(basePath = "./public/data/categories.json") {
  const res = await fetch(basePath);
  if (!res.ok) throw new Error("Categories fetch failed");
  return res.json();
}
