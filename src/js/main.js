import { loadHeaderFooter, qs, qsa } from "./utils.mjs";
import {
  searchBooks,
  fetchQuote,
  fetchCategoriesJson,
} from "./api.mjs";
import {
  toggleFavorite,
  addToCart,
  getFavorites,
} from "./storage.mjs";

async function renderCategories() {
  try {
    const categories = await fetchCategoriesJson("./public/data/categories.json");
    const container = qs("#category-list");
    container.innerHTML = categories
      .map(
        (cat) =>
          `<div class="category-card" tabindex="0">${cat.name}</div>`
      )
      .join("");
  } catch (e) {
    console.error("Error loading categories:", e);
  }
}

async function renderBooks(containerSelector, query, maxResults = 8) {
  const container = qs(containerSelector);
  container.innerHTML = "<p>Loading...</p>";
  try {
    const books = await searchBooks(query, maxResults);
    if (!books.length) {
      container.innerHTML = "<p>No books found.</p>";
      return;
    }
    container.innerHTML = books
      .map((book) => {
        const info = book.volumeInfo || {};
        const thumb = info.imageLinks?.thumbnail?.replace(/^http:/, "https:") || "./public/images/default-cover.jpg";
        return `
          <div class="book-card" tabindex="0" data-id="${book.id}">
            <a href="./book_pages/book-details.html?id=${book.id}">
              <img src="${thumb}" alt="${info.title || "No title"}" />
              <h3>${info.title || "No title"}</h3>
            </a>
            <button class="fav-btn btn" data-id="${book.id}">♥ Favorite</button>
          </div>
        `;
      })
      .join("");
    // Attach favorite button listeners
    qsa(".fav-btn", container).forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const bookId = btn.dataset.id;
        // Find book object by id in rendered books
        const book = books.find((b) => b.id === bookId);
        if (!book) return;
        const added = toggleFavorite({
          id: book.id,
          volumeInfo: book.volumeInfo,
        });
        btn.textContent = added ? "♥ Favorited" : "♥ Favorite";
      });
    });
  } catch (e) {
    container.innerHTML = "<p>Failed to load books.</p>";
    console.error(e);
  }
}

async function renderFavorites() {
  const favorites = getFavorites();
  const container = qs("#favorites-grid");
  if (!favorites.length) {
    container.innerHTML = "<p>No favorites yet.</p>";
    return;
  }
  container.innerHTML = favorites
    .map((book) => {
      const info = book.volumeInfo || {};
      const thumb = info.imageLinks?.thumbnail?.replace(/^http:/, "https:") || "./public/images/default-cover.jpg";
      return `
        <div class="book-card" tabindex="0" data-id="${book.id}">
          <a href="./book_pages/book-details.html?id=${book.id}">
            <img src="${thumb}" alt="${info.title || "No title"}" />
            <h3>${info.title || "No title"}</h3>
          </a>
          <button class="fav-btn btn" data-id="${book.id}">♥ Favorited</button>
        </div>
      `;
    })
    .join("");
}

async function renderQuote() {
  try {
    const quote = await fetchQuote();
    const area = qs("#quote-area");
    if (quote) {
      area.innerHTML = `<blockquote>"${quote.content}" — <strong>${quote.author}</strong></blockquote>`;
    }
  } catch (e) {
    console.error("Failed to load quote:", e);
  }
}

async function init() {
  await loadHeaderFooter("./public/partials/");

  await renderQuote();
  await renderCategories();

  // Sample recommended and trending books
  await renderBooks("#recommended-grid", "bestsellers");
  await renderBooks("#trending-grid", "trending");

  await renderFavorites();

  // Search form handler
  const searchForm = qs("#search-form");
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = qs("#search-input").value.trim();
    if (!query) return;
    await renderBooks("#recommended-grid", query);
    // Optionally clear trending/favorites or update UI accordingly
  });
}

init();
