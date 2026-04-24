import apiClient from "../utils/api";

/**
 * Fetch services/professionals with optional filters
 * @param {Object} filters
 * @returns {Promise<Array>}
 */
export async function fetchServices(filters = {}) {
  const params = new URLSearchParams();

  if (filters.category) params.append("category", filters.category);
  if (filters.subCategory) params.append("category", filters.subCategory); // Map subCategory to category for BE
  if (filters.sort) params.append("sort", filters.sort);

  const queryString = params.toString() ? `?${params.toString()}` : "";
  return apiClient.get(`/workers${queryString}`);
}

/**
 * Book a service
 * @param {Object} data Booking data payload
 * @returns {Promise<Object>}
 */
export async function bookService(data) {
  return apiClient.post("/book", data);
}

/**
 * Get worker by category (Legacy but used in page.js)
 * @param {string} category 
 * @returns {Promise<Array>}
 */
export async function fetchWorkersByCategory(category) {
  return apiClient.get(`/filterworker?category=${category}`);
}
