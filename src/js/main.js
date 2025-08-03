// src/js/main.js
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.innerHTML += `<p>JavaScript is working!</p>`;
});


// src/js/main.js
async function loadHTML(selector, url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    document.querySelector(selector).innerHTML = html;
  } catch (err) {
    console.error(`Error loading ${url}:`, err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "/partials/header.html");
  loadHTML("footer", "/partials/footer.html");
});
