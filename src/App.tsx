import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ConfigPage from './components/config/ConfigPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/config">API Configuration</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/" element={<h1>Welcome to Movie Search</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;