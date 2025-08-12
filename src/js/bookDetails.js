import { loadHeaderFooter } from "./utils.mjs";
import { getBookById, fetchQuote } from "./api.mjs";
import { addToCart, toggleFavorite } from "./storage.mjs";
import { qs } from "./utils.mjs";

async function init() {
  // Load header/footer partials (relative to book-details.html)
  await loadHeaderFooter("../public/partials/");

  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const area = qs("#book-details");

  if (!id) {
    area.innerHTML = "<p>No book specified</p>";
    return;
  }

  try {
    const book = await getBookById(id);
    const info = book.volumeInfo || {};
    const thumb =
      info.imageLinks?.thumbnail?.replace(/^http:/, "https:") ||
      "../public/images/default-cover.jpg";

    area.innerHTML = `
      <div class="book-details">
        <div class="detail-grid">
          <img src="${thumb}" alt="${info.title || "No title"}" />
          <div class="detail-meta">
            <h2>${info.title || "No title"}</h2>
            <p><strong>Authors:</strong> ${(info.authors || []).join(", ")}</p>
            <p><strong>Publisher:</strong> ${info.publisher || "Unknown"}</p>
            <p><strong>Published:</strong> ${info.publishedDate || "Unknown"}</p>
            <p>${info.description || "No description available."}</p>
            <div style="margin-top:1rem;">
              <button id="fav-btn" class="btn">♥ Favorite</button>
              <button id="order-btn" class="btn primary">Order (simulate)</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const favBtn = document.getElementById("fav-btn");
    favBtn.addEventListener("click", () => {
      const added = toggleFavorite({
        id: book.id,
        volumeInfo: book.volumeInfo,
      });
      favBtn.textContent = added ? "♥ Favorited" : "♥ Favorite";
    });

    document.getElementById("order-btn").addEventListener("click", () => {
      addToCart({ id: book.id, title: info.title, price: 9.99 });
      alert("Order simulated. Check Order page (not implemented).");
    });
  } catch (e) {
    console.error(e);
    area.innerHTML = "<p>Failed to load book details.</p>";
  }

  try {
    const quote = await fetchQuote();
    const qarea = document.createElement("div");
    qarea.innerHTML = quote
      ? `<blockquote>"${quote.content}" — <strong>${quote.author}</strong></blockquote>`
      : "";
    area.prepend(qarea);
  } catch {
    // ignore quote loading errors
  }
}

init();
