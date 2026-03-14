import React, { useState, useEffect } from "react";
import { useMovies } from "../context/MoviesContext";
import { fetchMoviesByGenre, getImageURL, fetchMovieDetails } from "../services/api";

const customGenres = [
  { id: "action", name: "Action" },
  { id: "adventure", name: "Adventure" },
  { id: "animation", name: "Animation" },
  { id: "comedy", name: "Comedy" },
  { id: "crime", name: "Crime" },
  { id: "documentary", name: "Documentary" },
  { id: "drama", name: "Drama" },
  { id: "family", name: "Family" },
  { id: "fantasy", name: "Fantasy" },
  { id: "history", name: "History" },
];

const GenreSection = () => {
  const { loading, openMoviesDetails } = useMovies();
  const genres = customGenres;

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreMovies, setGenreMovies] = useState([]);
  const [loadingGenreMovies, setLoadingGenreMovies] = useState(false);

  useEffect(() => {
    if (!loading && genres.length > 0) {
      setSelectedGenre(genres[0]);
    }
  }, [loading, genres]);

  useEffect(() => {
    const loadGenreMovies = async () => {
      if (!selectedGenre) return;

      try {
        setLoadingGenreMovies(true);

        const movies = await fetchMoviesByGenre(selectedGenre.id);

        const detailedMovies = await Promise.all(
          movies.slice(0, 8).map(async (movie) => {
            const details = await fetchMovieDetails(movie.imdbID);
            return { ...movie, ...details };
          })
        );

        setGenreMovies(detailedMovies);
      } catch (error) {
        console.error("Error loading genre movies:", error);
        setGenreMovies([]);
      } finally {
        setLoadingGenreMovies(false);
      }
    };

    loadGenreMovies();
  }, [selectedGenre]);

  if (loading || !selectedGenre) {
    return (
      <section className="py-12 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-neutral-900/50" id="genres">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Browse by Genre
        </h2>

        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {genres.slice(0, 10).map((gen) => {
              return (
                <button
                  key={gen.id}
                  onClick={() => setSelectedGenre(gen)}
                  className={`px-4 py-2 rounded-md transition-colors text-sm ${
                    selectedGenre?.id === gen.id
                      ? "bg-purple-600 text-white"
                      : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                  }`}
                >
                  {gen.name}
                </button>
              );
            })}
          </div>
        </div>

        {loadingGenreMovies ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {genreMovies.map((movie) => {
              return (
                <div key={movie.imdbID} className="group cursor-pointer" onClick={()=> openMoviesDetails(movie.imdbID)}>
                  <div className="relative rounded-lg overflow-hidden bg-neutral-800">
                    <div className="aspect-[2/3]">
                      <img
                        src={getImageURL(movie.Poster)}
                        alt={movie.Title}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-35"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>

                          <span className="text-yellow-400 text-sm font-medium">
                            {movie.imdbRating || ""}
                          </span>
                        </div>

                        <span className="text-neutral-300 text-sm">
                          {movie.Year || ""}
                        </span>
                      </div>
                     <button
                  onClick={() => 
                      openMoviesDetails(movie.imdbID)}
               className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 mt-2">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                   viewBox="0 0 20 20"
                  fill="currentColor"
                   >
                <path
                 fillRule="evenodd"
               d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zm0 11a4 4 0 110-8 4 4 0 010 8z"
                   clipRule="evenodd"
                     />
                 </svg>

                   View Details
                  </button>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3 className="text-white text-sm font-medium truncate">
                      {movie.Title}
                    </h3>

                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center space-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>

                        <span className="text-neutral-400 text-xs">
                          {movie.imdbRating || ""}
                        </span>
                      </div>

                      <span className="text-neutral-500 text-xs">
                        {movie.Year || ""}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default GenreSection;