import React, { useRef, useState } from 'react';
import { getImageURL } from '../services/api';
import { useMovies } from "../context/MoviesContext"

const MovieSlider = ({title, movies, subtitle = ""}) => {
    const sliderRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [hoveredMovieId, setHoveredMoviesId] = useState(null);
    const {openMoviesDetails} = useMovies();


    const scroll =(direction)=>{
        if(isScrolling) return;
        setIsScrolling(true);
        const {current} = sliderRef
        const scrollAmount =
        direction === "left"
        ? -current.clientWidth * 0.75
        : current.clientWidth * 0.75

        current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",

        });

        setTimeout(() =>{
            setIsScrolling(false);
        }, 500);
    };

    const formatRating = (rating) => {
        retrun (Math.round(rating * 10) / 10).toFixed(1);
    };

    const handleMovieClick = (moviesId) =>{
      openMoviesDetails(moviesId);
      console.log("working");
    }

    if (!movies || movies.length === 0){
        return null;
    }
    return (
        <section className="py-12" id="">
  <div className="container mx-auto px-4">
    <div className="flex items-baseline justify-between mb-8">
      
      <div className="text-2xl md:text-3xl font-bold text-white">
        <h2>{title}</h2>
        {/* Conditional Rendering */}
        {subtitle && (
           <p className="text-neutral-400 text-sm mt-1">{subtitle}</p> 
        )}

      </div>

      <div className="flex space-x-2">
        <button
          className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all"
          aria-label="Scroll left"
          onClick={() => scroll ("left")}
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
  className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all"
  aria-label="Scroll right"
  onClick={() => scroll ("right")}
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
      d="M9 5l7 7-7 7"
    />
  </svg>
</button>
      </div>

    </div>
    {/* Movie Slider */}
    <div className="relative">
  <div className="flex space-x-4 overflow-x-hidden scrollbar-hide pb-4 snap-x"
  ref={sliderRef}
  style={{scrollbarWidth: "none", msOverflowStyle: "none"}}
  
  >
    {/* Conditional Rendering */}
    {movies.map((movie)=>{
        return(
            <div className="min-w-50 md:min-w-60 snap-start relative group cursor-pointer"
             key={movie.id}
             onMouseEnter={()=> setHoveredMoviesId(movies.imdbID)}
             onMouseLeave={() => setHoveredMoviesId(null)}
             onClick={() => handleMovieClick(movie.imdbID)}
             
             >
      <div className="rounded-lg overflow-hidden bg-neutral-800">
        <div className="relative aspect-2/3">
          <img
            src={getImageURL(movie.Poster)}
            alt="{movie.Title}"
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-35"
          />

          {/* Hover Overlay */}
          <div className={"absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-100"}

          >
            <div className="transform translate-y-0.5 group-hover:translate-y-0 transition-all duration-100 space-y-2">
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-yellow-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 
        0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 
        00-.364 1.118l1.07 3.292c.3.921-.755 
        1.688-1.54 1.118l-2.8-2.034a1 1 0 
        00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 
        00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 
        00.951-.69L9.05 2.927z"
        />
      </svg>

      <span className="text-yellow-500 text-sm font-medium">
        {movie.imdbRating || ""}
      </span>
    </div>

    <span className="text-neutral-400 text-sm">
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
        </div>
      </div>
      {/* Movies Info */}
<div className="mt-3">
  <h3 className="text-white text-sm font-medium truncate">
    {movie.Title}
  </h3>

  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 text-yellow-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 
        0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 
        00-.364 1.118l1.07 3.292c.3.921-.755 
        1.688-1.54 1.118l-2.8-2.034a1 1 0 
        00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 
        00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 
        00.951-.69L9.05 2.927z" />
      </svg>

      <span className="text-neutral-400 text-xs">
  {movie.imdbRating && movie.imdbRating !== "N/A" ? movie.imdbRating : ""}
</span>
    </div>
    <span className='text-neutral-500 text-xs'>
        {movie.Year || "N/A"}
    </span>
  </div>
</div>
    </div>
        )
    })}

  </div>
</div>
  </div>
</section>
    );
}

export default MovieSlider;
