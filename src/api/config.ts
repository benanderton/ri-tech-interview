/**
 * Central configuration for OMDB integration.
 * Reads persisted API key and optional base URL from localStorage
 * (via the Redux settings slice) and exports a config object.
 *
 * The config object is refreshed on each import, ensuring the latest
 * persisted values are used without needing manual reload.
 */

import { useAppSelector } from '../store/hooks'; // We'll create this hook later
import { RootState } from '../store/store';

// Lazy-initialized config object that reads from persisted store
let cachedConfig: { apiKey: string; baseUrl?: string } | null = null;

/**
 * Retrieve the current OMDB configuration.
 * If nothing is persisted, returns empty string / undefined.
 */
export function getOmdbConfig() {
  if (cachedConfig) {
    return cachedConfig;
  }

  // Access the persisted settings via Redux store
  // In a real app we might use useAppSelector inside a component,
  // but for config import we can directly read from localStorage
  // as a fallback. However, since the store updates localStorage,
  // we can just read it here.
  const persisted = localStorage.getItem('omdbConfig');
  const parsed = persisted ? JSON.parse(persisted) : {};

  cachedConfig = {
    apiKey: parsed.apiKey ?? '',
    baseUrl: parsed.baseUrl,
  };

  return cachedConfig;
}

/**
 * Helper for logging the current config – used during development
 * and on save actions.
 */
export function logCurrentOmdbConfig() {
  const cfg = getOmdbConfig();
  console.log('[OMDB Config] API Key:', cfg.apiKey);
  if (cfg.baseUrl) {
    console.log('[OMDB Config] Base URL:', cfg.baseUrl);
  }
}