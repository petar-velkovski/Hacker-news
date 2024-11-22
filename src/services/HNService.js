// src/services/HNService.js
const SEARCH_BASE_URL = "https://hn.algolia.com/api/v1";
/**
 * Fetch top stories with pagination support.
 * @param {number} page The page number to fetch.
 * @param {number} hitsPerPage The number of hits per page (optional).
 */
export async function fetchData(
  query,
  searchQuery,
  page = 0,
  hitsPerPage = 20
) {
  const response = await fetch(
    `${SEARCH_BASE_URL}/${query}&query=${searchQuery}&page=${page}&hitsPerPage=${hitsPerPage}`
  );
  return response.json();
}

/**
 * Fetch stories by a specific user.
 */
export async function fetchShipowStories() {
  const response = await fetch(`${SEARCH_BASE_URL}/users/Shipow`);
  return response.json();
}

/**
 * Fetch item details.
 */
export async function fetchItemDetails(itemId) {
  const response = await fetch(`${SEARCH_BASE_URL}/items/${itemId}`);
  return response.json();
}

/**
 * Search posts by query.
 */
export async function searchPosts(query, tags) {
  const response = await fetch(
    `${SEARCH_BASE_URL}/search?query=${encodeURIComponent(query)}${
      tags ? `&tags=${tags}` : ""
    }`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  return response.json();
}
