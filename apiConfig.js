// src/config/apiConfig.js
import { API } from './Config'; // Import API URLs from config.js

// Default fetch options (common headers, content type, etc.)
const API_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Utility function for retrying fetch requests
const fetchWithRetry = async (url, options = {}, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, { ...API_OPTIONS, ...options });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error; // Retry exhausted
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, i) * 1000)); // Exponential backoff
    }
  }
};

// Centralized GET request
export const get = async (endpoint, options = {}) => {
  const url = API[endpoint](); // Use the endpoint function from API config
  return fetchWithRetry(url, { method: "GET", ...options });
};

// Centralized POST request
export const post = async (endpoint, data, options = {}) => {
  const url = API[endpoint]();
  return fetchWithRetry(url, {
    method: "POST",
    body: JSON.stringify(data),
    ...options,
  });
};

// POST for specific endpoint (e.g., contact us)
export const postContactUs = async (data, options = {}) => {
  const url = API.postContactUs;
  return fetchWithRetry(url, {
    method: "POST",
    body: JSON.stringify(data),
    ...options,
  });
};
