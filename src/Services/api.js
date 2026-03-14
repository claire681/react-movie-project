const API_KEY = "57b73090";
const BASE_URL = "https://www.omdbapi.com/";

const trendingTerms = ["mission", "avengers", "superman", "fast", "love", "king", "war"];
const popularTerms = ["marvel", "action", "comedy", "adventure", "hero"];
const topRatedTerms = ["drama", "crime", "thriller", "classic", "family"];

const getRandomTerm = (terms) => {
  return terms[Math.floor(Math.random() * terms.length)];
};

export const fetchTrendingMovies = async () => {
  try {
    const term = getRandomTerm(trendingTerms);
    const response = await fetch(`${BASE_URL}?s=${term}&apikey=${API_KEY}`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error("Error fetching trending movies", error);
    return [];
  }
};

export const fetchPopularMovies = async () => {
  try {
    const term = getRandomTerm(popularTerms);
    const response = await fetch(`${BASE_URL}?s=${term}&apikey=${API_KEY}`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error("Error fetching popular movies", error);
    return [];
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const term = getRandomTerm(topRatedTerms);
    const response = await fetch(`${BASE_URL}?s=${term}&apikey=${API_KEY}`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error("Error fetching top rated movies", error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}?i=${movieId}&plot=full&apikey=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details", error);
    return null;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}?s=${encodeURIComponent(query)}&page=1&apikey=${API_KEY}`
    );
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error("Error searching movies", error);
    return [];
  }
};

export const fetchGenres = async () => {
  return [];
};


export const fetchMoviesByGenre = async (genreName) => {
  try {
    const response = await fetch(`${BASE_URL}?s=${genreName}&apikey=${API_KEY}`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error("Error fetching movies by genre", error);
    return [];
  }
};
export const getImageURL = (poster) => {
  if (!poster || poster === "N/A") {
    return "https://via.placeholder.com/400x600?text=No+Image+Available";
  }
  return poster;
};