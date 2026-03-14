import React, { useState, useEffect, useRef } from "react";
import { useMovies } from "../context/MoviesContext";
import { searchMovies } from "../services/api.js";

function Navbar() {
  const { openMoviesDetails } = useMovies();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResult, setShowSearchResults] = useState(false);

  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim().length > 2) {
        setIsSearching(true);
        try {
          const result = await searchMovies(searchQuery);
          setSearchResult(result ? result.slice(0, 5) : []);
          setShowSearchResults(true);
        } catch (error) {
          console.error("Error Searching Movies:", error);
          setSearchResult([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResult([]);
        setShowSearchResults(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchFocus = () => {
    if (searchQuery.trim().length > 2 && searchResult.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleMovieSelected = (movieId) => {
    openMoviesDetails(movieId);
    setShowSearchResults(false);
    setSearchQuery("");
    setIsMobileMenuOpen(false);
  };

  const handleSearchClick = async () => {
    if (searchQuery.trim().length < 2) return;

    setIsSearching(true);

    try {
      const result = await searchMovies(searchQuery);

      if (result && result.length > 0) {
        setSearchResult(result.slice(0, 5));
        setShowSearchResults(true);

        // Open the first result automatically
        openMoviesDetails(result[0].imdbID);

        setShowSearchResults(false);
        setSearchQuery("");
        setIsMobileMenuOpen(false);
      } else {
        setSearchResult([]);
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-purple-500 font-bold text-3xl">
                Claire&apos;s <span className="text-white">Cinema</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-white hover:text-red-400 transition-all font-medium"
            >
              Home
            </a>
            <a
              href="#trending"
              className="text-white hover:text-red-400 transition-all font-medium"
            >
              Trending
            </a>
            <a
              href="#popular"
              className="text-white hover:text-red-400 transition-all font-medium"
            >
              Popular
            </a>
            <a
              href="#top-rated"
              className="text-white hover:text-red-400 transition-all font-medium"
            >
              Top Rated
            </a>
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:block relative" ref={searchContainerRef}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchClick();
                  }
                }}
                placeholder="Search movies..."
                className="bg-neutral-800/80 text-white px-4 py-2 rounded-full text-sm w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
              />

              {/* Conditional Rendering */}
              {isSearching ? (
                <div className="absolute right-3 top-2.5">
                  <svg
                    className="w-4 h-4 text-neutral-400 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSearchClick}
                  className="absolute right-3 top-2.5 text-neutral-400 hover:text-white"
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Search Result dropdown conditional rendering */}
            {showSearchResult && searchResult && searchResult.length > 0 && (
              <div className="absolute mt-2 w-72 bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                <ul className="divide-y divide-neutral-700">
                  {/* Map Method */}
                  {searchResult.map((movie) => {
                    return (
                      <li key={movie.imdbID} className="hover:bg-neutral-700">
                        <button
                          className="flex items-center p-3 w-full text-left"
                          onClick={() => handleMovieSelected(movie.imdbID)}
                        >
                          <div className="w-10 h-10 bg-neutral-700 rounded overflow-hidden flex-shrink-0">
                            {/* Conditional Rendering */}
                            {movie.Poster && movie.Poster !== "N/A" ? (
                              <img
                                src={movie.Poster}
                                alt={movie.Title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                                No Image
                              </div>
                            )}
                          </div>

                          <div className="ml-3 flex-1">
                            {/* Movie Title */}
                            <p className="text-sm font-medium text-white truncate">
                              {movie.Title}
                            </p>

                            {/* Movie Year */}
                            <p className="text-xs text-neutral-400">
                              {movie.Year || "N/A"}
                            </p>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* No result conditional rendering */}
            {showSearchResult &&
              searchQuery.trim().length > 2 &&
              (!searchResult || searchResult.length === 0) &&
              !isSearching && (
                <div className="absolute mt-2 w-72 bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="p-4 text-center text-neutral-400 text-sm">
                    No movies found matching "{searchQuery}"
                  </div>
                </div>
              )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {/* Conditional Rendering */}
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Conditional Rendering */}
        {isMobileMenuOpen && (
          <div className="mt-4 pb-4 space-y-4 md:hidden">
            <a
              href="#"
              className="block text-white hover:text-red-400 transition-all font-medium"
            >
              Home
            </a>
            <a
              href="#trending"
              className="block text-white hover:text-red-400 transition-all font-medium"
            >
              Trending
            </a>
            <a
              href="#popular"
              className="block text-white hover:text-red-400 transition-all font-medium"
            >
              Popular
            </a>
            <a
              href="#top-rated"
              className="block text-white hover:text-red-400 transition-all font-medium"
            >
              Top Rated
            </a>

            <div className="relative mt-3" ref={searchContainerRef}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchClick();
                    }
                  }}
                  placeholder="Search movies..."
                  className="w-full bg-neutral-800/80 text-white px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                />

                {/* Conditional Rendering */}
                {isSearching ? (
                  <div className="absolute right-3 top-2.5">
                    <svg
                      className="w-4 h-4 text-neutral-400 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSearchClick}
                    className="absolute right-3 top-2.5 text-neutral-400 hover:text-white"
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Mobile Search Result Conditional Rendering */}
              {showSearchResult && searchResult && searchResult.length > 0 && (
                <div className="absolute mt-2 w-full bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                  <ul className="divide-y divide-neutral-700">
                    {/* Map Method */}
                    {searchResult.map((movie) => {
                      return (
                        <li key={movie.imdbID} className="hover:bg-neutral-700">
                          <button
                            className="flex items-center p-3 w-full text-left"
                            onClick={() => handleMovieSelected(movie.imdbID)}
                          >
                            <div className="w-10 h-10 bg-neutral-700 rounded overflow-hidden flex-shrink-0">
                              {/* Conditional Rendering */}
                              {movie.Poster && movie.Poster !== "N/A" ? (
                                <img
                                  src={movie.Poster}
                                  alt={movie.Title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                                  No Image
                                </div>
                              )}
                            </div>

                            <div className="ml-3 flex-1">
                              {/* Movie Title */}
                              <p className="text-sm font-medium text-white truncate">
                                {movie.Title}
                              </p>

                              {/* Movie Year */}
                              <p className="text-xs text-neutral-400">
                                {movie.Year || "N/A"}
                              </p>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* No result conditional rendering */}
              {showSearchResult &&
                searchQuery.trim().length > 2 &&
                (!searchResult || searchResult.length === 0) &&
                !isSearching && (
                  <div className="absolute mt-2 w-full bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="p-4 text-center text-neutral-400 text-sm">
                      No movies found matching "{searchQuery}"
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;