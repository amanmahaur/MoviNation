import React, { useCallback,createContext, useState, useContext } from 'react';

// Create a context with an empty initial value
const MovieContext = createContext({});

// Custom hook to use the MovieContext
export function useMovies() {
  return useContext(MovieContext);
}

// Custom provider component
export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);  // State for storing movies
  const [trendingMovies, setTrendingMovies] = useState([]);  // State for storing trending movies
  const [actionMovies,setActionMovies]=useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [error, setError] = useState(null); // State for handling errors

  // Function to fetch movies from an API (TMDB API in your case)
  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=032741a31ac2ddb3be55838cbf656b9d&query=${query}`
      );
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch trending movies from the API
  const fetchTrendingMovies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/trending/movie/week?api_key=032741a31ac2ddb3be55838cbf656b9d'
      );
      const data = await response.json();
      
      // Limit the results to the first 10 movies
      setTrendingMovies(data.results.slice(0, 10) || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchActionMovies = useCallback( async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=032741a31ac2ddb3be55838cbf656b9d&with_genres=28
`
      );
      const data = await response.json();
      setActionMovies(data.results.slice(0, 10) || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  },[]); 

  const fetchHorrorMovies = useCallback( async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=032741a31ac2ddb3be55838cbf656b9d&with_genres=27
`
      );
      const data = await response.json();
      setHorrorMovies(data.results.slice(0, 10) || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  },[]); 
  const fetchRomanceMovies = useCallback( async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=032741a31ac2ddb3be55838cbf656b9d&with_genres=10749
`
      );
      const data = await response.json();
      setRomanceMovies(data.results.slice(0, 10) || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  },[]);

  // Function to get a movie by its ID
  const getMovieById = (id) => {
    return movies.find(movie => movie.id.toString() === id);
  };

  // Context value that will be supplied to any descendants of this provider
  const contextValue = {
    movies,
    trendingMovies,
    romanceMovies,
    actionMovies,
    horrorMovies,  // Include trending movies in the context
    loading,
    error,
    fetchMovies,
    fetchTrendingMovies, 
    fetchRomanceMovies,
    fetchHorrorMovies,
    fetchActionMovies, // Include this in the context value
    getMovieById,
  };

  return React.createElement(
    MovieContext.Provider,
    { value: contextValue },
    children
  );
}
