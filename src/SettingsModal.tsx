import { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [apiKey, setApiKey] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  // Load stored key on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('omdbApiKey');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  // Save key to localStorage
  const handleSave = () => {
    if (!apiKey.trim()) {
      alert('API key cannot be empty.');
      return;
    }
    localStorage.setItem('omdbApiKey', apiKey.trim());
    setSavedMessage('API key saved successfully.');
    setToastOpen(true);
    // Close modal after a brief moment
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  // Show toast for a few seconds
  useEffect(() => {
    if (toastOpen && savedMessage) {
      const timer = setTimeout(() => setToastOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastOpen, savedMessage]);

  // Render modal overlay only when open
  if (!isOpen) return null;

  return (
    // Simple overlay and modal styling
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      }}>
        <h3>OMDb API Settings</h3>
        <label htmlFor="apiKeyInput' style={{ marginTop: '10px', display: 'block' }}>
          API Key:
        </label>
        <input
          id="apiKeyInput"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            box-sizing: 'border-box',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={handleSave}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#2d8cf0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        </div>
        {savedMessage && <p style={{ color: 'green', marginTop: '10px' }}>{savedMessage}</p>}
      </div>
    </div>
  );
};