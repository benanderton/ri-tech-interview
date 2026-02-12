import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setOmdbConfig } from '../store/settingsSlice';
import { logOmdbConfig } from '../utils/logOmdbConfig';

export default function SettingsOmdbPage() {
  const dispatch = useAppDispatch();

  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false); // for potential modal usage

  const handleSave = () => {
    // Simple validation: non‑empty and at least 10 characters
    if (!apiKey || apiKey.length < 10) {
      setError('API key must be at least 10 characters.');
      return;
    }

    // Clear previous error
    setError(null);

    // Persist to Redux (which also writes to localStorage)
    dispatch(setOmdbConfig({ apiKey, baseUrl }));

    // Log the persisted configuration
    logOmdbConfig(apiKey, baseUrl);
  };

  return (
    <div>
      <h2>OMDB Configuration</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>
        API Key (required, min 10 chars):
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="e.g., abcdefghij123456"
        />
      </label>

      <label>
        Base URL (optional):
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="https://www.omdbapi.com"
        />
      </label>

      <button onClick={handleSave}>Save Configuration</button>
    </div>
  );
}