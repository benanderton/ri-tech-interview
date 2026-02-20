import { useState, useEffect } from 'react';
import { useMovies } from './movieContext';

const Search = () => {
  const { addMovie, removeMovie, toggleFavorite, favoriteIds } = useMovies();

  // State for search form
  const [searchTerm, setSearchTerm] = useState('');
  const [yearTerm, setYearTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Retrieve saved API key from localStorage
  const apiKey = localStorage.getItem('omdbApiKey');

  // Perform search on form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) {
      setError('API key not set. Please save it in Settings.');
      return;
    }
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');

    try {
      const url = new URL('https://www.omdbapi.com/');
      url.searchParams.append('apikey', apiKey);
      url.searchParams.append('t', searchTerm);
      if (yearTerm) url.searchParams.append('y', yearTerm);

      const response = await fetch(url.toString());
      const data = await response.json();

      if (data.Response === 'True') {
        // Add movie to global state
        addMovie({
          Title: data.Title,
          Year: data.Year,
          Plot: data.Plot,
        });
      } else {
        // API returned an error (e.g., movie not found)
        throw new Error(data.Error || 'Movie not found.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Retrieve current movies from context for display
  const movies = useMovies().movies;

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Movie Search</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Movie Title"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: '70%', padding: '8px', marginRight: '8px' }}
        />
        <input
          type="text"
          placeholder="Year (optional)"
          value={yearTerm}
          onChange={e => setYearTerm(e.target.value)}
          style={{ width: '25%', padding: '8px' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2d8cf0',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Results</h3>
      {movies.length === 0 ? (
        <p>No movies to display.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {movies.map(movie => (
            <li
              key={movie.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '10px',
                marginBottom: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>{movie.Title}</strong> ({movie.Year})
                <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>{movie.Plot}</p>
              </div>
              <div>
                <button
                  onClick={() => removeMovie(movie.id)}
                  style={{
                    marginRight: '8px',
                    padding: '4px 8px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
                <button
                  onClick={() => toggleFavorite(movie.id)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: favoriteIds.has(movie.id) ? '#27ae60' : '#f1c40f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                  }}
                >
                  {favoriteIds.has(movie.id) ? 'Unfavorite' : 'Favorite'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;