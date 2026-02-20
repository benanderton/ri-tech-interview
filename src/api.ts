/**
 * Helper utilities for interacting with the OMDb API.
 * The API key is stored client‑side in `localStorage` under the key
 * `omdbApiKey`. This file provides a simple way to retrieve that key
 * and to build request URLs that include it.
 */

export const OMDB_API_URL = 'https://www.omdbapi.com/';

/**
 * Retrieve the stored OMDb API key from localStorage.
 * Returns an empty string if no key is found.
 */
export const getOmdbApiKey = (): string => {
  return localStorage.getItem('omdbApiKey') ?? '';
};

/**
 * Build a request URL that includes the API key.
 *
 * @param params - The base query parameters (e.g., `{ s: 'matrix', type: 'movie' }`)
 * @returns A full URL with the API key appended as `apikey=` query param.
 */
export const buildOmdbUrl = (params: Record<string, string>): string => {
  const url = new URL(OMDB_API_URL);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
  const apiKey = getOmdbApiKey();
  if (apiKey) {
    url.searchParams.append('apikey', apiKey);
  }
  return url.toString();
};

/**
 * Example async helper that fetches search results for movies.
 *
 * @param query - The search term (e.g., 'matrix')
 * @returns Parsed JSON response from OMDb.
 */
export const searchMovies = async (query: string) => {
  const response = await fetch(buildOmdbUrl({ s: query, type: 'movie' }));
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OMDb error: ${response.status} ${errorBody}`);
  }
  return response.json();
};