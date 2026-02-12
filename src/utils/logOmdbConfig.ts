/**
 * Utility to log the OMDB configuration in a consistent, developer‑friendly format.
 * usage:
 *   logOmdbConfig(apiKey, baseUrl);
 *
 * Output example (development):
 *   [OMDB Config] API Key: abcdefghij123456
 *   [OMDB Config] Base URL: https://www.omdbapi.com
 */
export function logOmdbConfig(apiKey: string, baseUrl?: string): void {
  console.log('[OMDB Config] API Key:', apiKey);
  if (baseUrl) {
    console.log('[OMDB Config] Base URL:', baseUrl);
  }
}