import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchMovieDetails,
} from "../Services/api";

const MoviesContext = createContext();

export const useMovies = () => useContext(MoviesContext);

export const MoviesProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);

        const [trending, popular, topRated] = await Promise.all([
          fetchTrendingMovies(),
          fetchPopularMovies(),
          fetchTopRatedMovies(),
        ]);

        const detailedTrending = await Promise.all(
          (trending || []).map(async (movie) => {
            const details = await fetchMovieDetails(movie.imdbID);
            return { ...movie, ...details };
          })
        );

        const detailedPopular = await Promise.all(
          (popular || []).map(async (movie) => {
            const details = await fetchMovieDetails(movie.imdbID);
            return { ...movie, ...details };
          })
        );

        const detailedTopRated = await Promise.all(
          (topRated || []).map(async (movie) => {
            const details = await fetchMovieDetails(movie.imdbID);
            return { ...movie, ...details };
          })
        );

        setTrendingMovies(detailedTrending);
        setPopularMovies(detailedPopular);
        setTopRatedMovies(detailedTopRated);
      } catch (err) {
        console.log("Error fetching movie data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  const openMoviesDetails = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const closeMovieDetails = () => {
    setSelectedMovieId(null);
    document.body.style.overflow = "";
  };

  return (
    <MoviesContext.Provider
      value={{
        trendingMovies,
        popularMovies,
        topRatedMovies,
        genres,
        loading,
        error,
        selectedMovieId,
        openMoviesDetails,
        closeMovieDetails,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContext;