export async function loadHeaderFooter() {
  const loadComponent = async (id, path) => {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Failed to load ${path}`);
      const html = await res.text();
      document.getElementById(id).innerHTML = html;
    } catch (err) {
      console.error(err);
    }
  };

  await loadComponent("header", "../partials/header.html");
  await loadComponent("footer", "../partials/footer.html");
}
