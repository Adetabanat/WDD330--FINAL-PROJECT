// helpers and partial loader
export function qs(sel, parent = document) {
  return parent.querySelector(sel);
}
export function qsa(sel, parent = document) {
  return Array.from(parent.querySelectorAll(sel));
}

export function safeText(s) {
  if (!s) return "";
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

/**
 * loadHeaderFooter(basePath)
 * basePath: string path to public/partials relative to the HTML file (example: './public/partials/' or '../public/partials/')
 */
export async function loadHeaderFooter(basePath = "../partials/") {
  try {
    const headerResp = await fetch(basePath + "header.html");
    const headerHtml = await headerResp.text();
    document.getElementById("main-header").innerHTML = headerHtml;

    const footerResp = await fetch(basePath + "footer.html");
    const footerHtml = await footerResp.text();
    document.getElementById("main-footer").innerHTML = footerHtml;

    // set year in footer if present
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  } catch (err) {
    console.error("Failed to load header/footer:", err);
  }
}
