import React from 'react';
import Navbar from './components/Navbar';
import MovieContent from './components/MovieContent';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { MoviesProvider } from './context/MoviesContext';

const App = () => {
  return (
    <MoviesProvider>
      <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <MovieContent />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </MoviesProvider>
  );
};

export default App;
