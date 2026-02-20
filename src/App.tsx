import { useState } from 'react';
import SettingsModal from './SettingsModal';
import { Search } from './Search';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <div>
          <button onClick={openModal} style={{ 
            padding: '6px 12px', 
            backgroundColor: '#2d8cf0', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Settings
          </button>
        </div>
      </div>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Render Search component */}
      <Search />

      {/* Conditionally render the Settings modal */}
      <SettingsModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default App;