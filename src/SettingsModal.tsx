import { useState, useEffect } from 'react';

export const SettingsModal = ({ onClose }: { onClose: () => void }) => {
  const [apiKey, setApiKey] = useState('');
  const [savedMessage, setSavedMessage] = useState(false);
  const [isMounted] = useState(true); // Prevent state updates after unmount

  // Load stored key when component mounts
  useEffect(() => {
    const storedKey = localStorage.getItem('omdbApiKey');
    if (storedKey && isMounted) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) return;
    localStorage.setItem('omdbApiKey', apiKey);
    setSavedMessage(true);
  };

  const handleCancel = () => {
    setApiKey('');
  };

  // Cleanup effect to avoid state updates after unmount
  useEffect(() => () => {
    setIsMounted(false);
  }, []);

  // Simple styling using plain classes (no Tailwind required)
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.5)' }}>
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '90%',
        margin: '2rem auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <button
          type="button"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}
          onClick={handleCancel}
        >
          &times;
        </button>

        <h2 style={{ textAlign: 'center' }}>Settings</h2>

        <form style={{ marginTop: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="omdbKeyInput" style={{ display: 'block', marginBottom: '0.5rem' }}>
              OMDb API Key
            </label>
            <input
              id="omdbKeyInput"
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '1rem',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              autoComplete="off"
              placeholder="Enter API key"
            />
          </div>

          {savedMessage && (
            <p style={{ color: '#28a745', marginBottom: '1rem' }}>
              API key saved successfully.
            </p>
          )}

          <button
            type="button"
            style={{
              width: '100%',
              padding: '0.6rem',
              background: '#0069d9',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={handleSave}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};