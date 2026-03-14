import React, { useState, useEffect } from "react";
import { fetchMovieDetails, getImageURL } from "../services/api.js";

const MoviesDetails = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        setError(null);
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (err) {
        console.error("Failed to load movie details:", err);
        setError("Failed to load movie details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    if (movieId) {
      getMovieDetails();
    }
  }, [movieId]);

  if (!movieId) return null;

  const formatRunTime = (runtime) => {
    if (!runtime || runtime === "N/A") return "N/A";
    const minutes = parseInt(runtime, 10);
    if (Number.isNaN(minutes)) return runtime;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatRevenue = (revenue) => {
    if (!revenue || revenue === "N/A") return "N/A";
    const number = Number(String(revenue).replace(/[$,]/g, ""));
    if (Number.isNaN(number)) return revenue;

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(number);
  };

  const ratingWidth =
    movie?.imdbRating && movie.imdbRating !== "N/A"
      ? `${(parseFloat(movie.imdbRating) / 10) * 100}%`
      : "0%";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-neutral-900 shadow-2xl border border-neutral-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
        >
          ✕
        </button>

        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
              <p className="mt-4 text-white">Loading details...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex h-96 items-center justify-center px-6 text-center text-white">
            {error}
          </div>
        ) : movie ? (
          <div>
            <div className="relative h-64 md:h-72 w-full overflow-hidden rounded-t-2xl">
              {movie.Poster && movie.Poster !== "N/A" ? (
                <img
                  src={getImageURL(movie.Poster)}
                  alt={movie.Title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-neutral-800" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent" />
            </div>

            <div className="p-6 md:p-8">
              <div className="md:flex md:gap-8 md:-mt-28 relative z-10">
                <div className="w-40 md:w-56 shrink-0 mb-6 md:mb-0">
                  <div className="overflow-hidden rounded-xl border border-neutral-700 shadow-lg">
                    {movie.Poster && movie.Poster !== "N/A" ? (
                      <img
                        src={getImageURL(movie.Poster)}
                        alt={movie.Title}
                        className="w-full h-auto object-cover"
                      />
                    ) : (
                      <div className="aspect-[2/3] bg-neutral-800 flex items-center justify-center text-neutral-400">
                        No Poster
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {movie.Title}
                    {movie.Year && (
                      <span className="ml-2 font-normal text-neutral-400">
                        ({movie.Year})
                      </span>
                    )}
                  </h1>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    {movie.imdbRating && movie.imdbRating !== "N/A" && (
                      <div className="flex items-center text-yellow-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 font-medium">{movie.imdbRating}</span>
                      </div>
                    )}

                    {movie.Runtime && (
                      <span className="text-neutral-300">
                        {formatRunTime(movie.Runtime)}
                      </span>
                    )}

                    {movie.Released && (
                      <span className="text-neutral-300">{movie.Released}</span>
                    )}
                  </div>

                  {movie.Genre && movie.Genre !== "N/A" && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {movie.Genre.split(", ").map((genre) => (
                        <span
                          key={genre}
                          className="rounded-full bg-neutral-700 px-3 py-1 text-xs text-neutral-300"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}

                  {movie.Plot && movie.Plot !== "N/A" && (
                    <div className="mt-6">
                      <h2 className="mb-2 text-xl font-semibold text-white">Overview</h2>
                      <p className="text-neutral-300">{movie.Plot}</p>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 flex items-center gap-3 shadow-lg shadow-purple-500/20">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                     <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-purple-600 ml-0.5"
                 viewBox="0 0 20 20"
                 fill="currentColor"
                  >
                    <path d="M8 5v10l8-5-8-5z" />
                      </svg>
                </span>

                <span className="font-medium">Watch Now</span>
                  </button>

                    <button className="rounded-lg bg-neutral-700 px-6 py-3 text-white hover:bg-neutral-600 flex items-center gap-3">
                 <svg
               xmlns="http://www.w3.org/2000/svg"
                 className="h-5 w-5"
                 viewBox="0 0 20 20"
                     fill="currentColor"
                 >
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                    </svg>
                  <span className="font-medium">Add to Watchlist</span>
                   </button>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-1 md:grid-cols-2 gap-12">
                <div>
              <h2 className="mb-4 text-2xl font-bold text-white">Details</h2>

                           <div className="space-y-5">
                           {movie.Production && movie.Production !== "N/A" && (
                            <div>
                              <h3 className="mb-1 text-sm text-neutral-400">Production Companies</h3>
                            <p className="text-white font-semibold leading-relaxed">{movie.Production}</p>
                                      </div>
                            )}

                            {movie.Country && movie.Country !== "N/A" && (
                           <div>
                        <h3 className="mb-1 text-sm text-neutral-400">Production Countries</h3>
                         <p className="text-white font-semibold">{movie.Country}</p>
                        </div>
                       )}

                    {movie.Language && movie.Language !== "N/A" && (
                         <div>
                    <h3 className="mb-1 text-sm text-neutral-400">Languages</h3>
                     <p className="text-white font-semibold">{movie.Language}</p>
                    </div>
                        )}

                  {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                    <div>
                 <h3 className="mb-1 text-sm text-neutral-400">Budget</h3>
                 <p className="text-white font-semibold">$225,000,000.0</p>
                  </div>
                 )}

                {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
              <div>
        <h3 className="mb-1 text-sm text-neutral-400">Revenue</h3>
        <p className="text-white font-semibold">$600,900,181.0</p>
      </div>
        )}

    <div>
      <h3 className="mb-1 text-sm text-neutral-400">Status</h3>
      <p className="text-white font-semibold">Released</p>
    </div>

    <div>
      <h3 className="mb-1 text-sm text-neutral-400">Original Language</h3>
      <p className="text-white font-semibold">EN</p>
           </div>
             </div>
          </div>
                <div>
                  <h2 className="mb-4 text-xl font-semibold text-white">Rating</h2>

                  {movie.imdbRating && movie.imdbRating !== "N/A" ? (
                    <div className="flex items-center gap-4">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-purple-500">
                        <span className="text-3xl font-bold text-white">
                          {movie.imdbRating}
                        </span>
                      </div>

                      <div className="flex-1">
                        <p className="text-neutral-300">
                          From {movie.imdbVotes || "N/A"} votes
                        </p>

                        <div className="mt-2 h-2.5 w-full rounded-full bg-neutral-700">
                          <div
                            className="h-2.5 rounded-full bg-purple-600"
                            style={{ width: ratingWidth }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-neutral-400">No Rating Available</p>
                  )}

                  <div className="mt-8 flex flex-wrap gap-3">

  <a
    href={movie.Website && movie.Website !== "N/A" ? movie.Website : "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-lg bg-neutral-700 px-4 py-2 text-white hover:bg-neutral-600 flex items-center gap-2"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"
      />
    </svg>

    Official Website
  </a>

  {movie.imdbID && (
    <a
      href={`https://www.imdb.com/title/${movie.imdbID}`}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg bg-yellow-700 px-4 py-2 text-white hover:bg-yellow-600 flex items-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 3a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V4a1 1 0 011-1z" />
      </svg>

      View on IMDb
    </a>
  )}

</div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MoviesDetails;