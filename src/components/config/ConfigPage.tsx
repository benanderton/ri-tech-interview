import React, { useState } from 'react';

interface APIConfig {
  apiKey: string;
  baseUrl: string;
}

const ConfigPage: React.FC = () => {
  const [config, setConfig] = useState<APIConfig>({
    apiKey: '',
    baseUrl: 'http://www.omdbapi.com',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just log the configuration to console as specified
    console.log('OMDB API Configuration:', config);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="config-page">
      <h1>API Configuration</h1>
      <form onSubmit={handleSubmit} className="config-form">
        <div className="form-group">
          <label htmlFor="apiKey">OMDB API Key:</label>
          <input
            type="text"
            id="apiKey"
            name="apiKey"
            value={config.apiKey}
            onChange={handleChange}
            placeholder="Enter your OMDB API key"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="baseUrl">API Base URL:</label>
          <input
            type="url"
            id="baseUrl"
            name="baseUrl"
            value={config.baseUrl}
            onChange={handleChange}
            placeholder="Enter the API base URL"
            required
          />
        </div>
        <button type="submit">Save Configuration</button>
      </form>
    </div>
  );
};

export default ConfigPage;