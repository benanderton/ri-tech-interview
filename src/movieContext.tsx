import { createContext, useContext, useState, ReactNode } from 'react';

export interface Movie {
  id: string;
  Title: string;
  Year: string;
  Plot: string;
  favorites: boolean;
}

interface MovieContextProps {
  movies: Movie[];
  addMovie: (movie: Omit<Movie, 'id'>) => void;
  removeMovie: (id: string) => void;
  toggleFavorite: (id: string) => void;
  favoriteIds: Set<string>;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export const useMovies = () => {
  const ctx = useContext(MovieContext);
  if (!ctx) throw new Error('useMovies must be used within MovieProvider');
  return ctx;
};

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const addMovie = (movie: Omit<Movie, 'id'>) => {
    const newMovie: Movie = { ...movie, id: crypto.randomUUID(), favorites: false };
    setMovies(prev => [...prev, newMovie]);
  };

  const removeMovie = (id: string) => {
    setMovies(prev => prev.filter(m => m.id !== id));
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleFavorite = (id: string) => {
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    // update favorites flag on movie
    setMovies(prev => prev.map(m => 
      m.id === id ? { ...m, favorites: !m.favorites } : m
    ));
  };

  return (
    <MovieContext.Provider value={{
      movies,
      addMovie,
      removeMovie,
      toggleFavorite,
      favoriteIds,
    }}>
      {children}
    </MovieContext.Provider>
  );
};