// Favorite books stored in localStorage under 'favorites'
const FAVORITES_KEY = "favorites";
// Cart items stored in localStorage under 'cart'
const CART_KEY = "cart";

// Get localStorage data helper
function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// Set localStorage data helper
function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Toggle favorite: add if not present, remove if present
export function toggleFavorite(book) {
  let favorites = getLocalStorage(FAVORITES_KEY);
  const index = favorites.findIndex((b) => b.id === book.id);
  if (index === -1) {
    favorites.push(book);
    setLocalStorage(FAVORITES_KEY, favorites);
    return true; // added
  } else {
    favorites.splice(index, 1);
    setLocalStorage(FAVORITES_KEY, favorites);
    return false; // removed
  }
}

// Add book to cart (simulate order)
export function addToCart(item) {
  let cart = getLocalStorage(CART_KEY);
  cart.push(item);
  setLocalStorage(CART_KEY, cart);
}

// Optional: export functions to get favorites and cart
export function getFavorites() {
  return getLocalStorage(FAVORITES_KEY);
}

export function getCart() {
  return getLocalStorage(CART_KEY);
}
