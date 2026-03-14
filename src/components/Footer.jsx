import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <a href="/" className="inline-block mb-6">
            <span className="text-purple-500 font-bold text-2xl">
              Claire's <span className="text-white">Cinema</span>
            </span>
          </a>

          <p className="mb-4 text-sm">
            Discover and explore the latest movies from around the world.
            Claire's Cinema gives you access to a vast collection of films across all
            genres.
          </p>

          <div className="flex space-x-4">
            <a href="#" className='text-neutral-500 hover:text-purple-500 transition-colors'
            >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5"
                        fill="currentColor"
                         viewBox="0 0 24 24"
                         >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>

            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition">
         <svg
        xmlns="http://www.w3.org/2000/svg"
           className="h-6 w-6"
          fill="currentColor"
            viewBox="0 0 24 24"
        >
        <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.54 4 20 5.46 20 7.75v8.5C20 18.54 18.54 20 16.25 20h-8.5C5.46 20 4 18.54 4 16.25v-8.5C4 5.46 5.46 4 7.75 4zm8.75 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
        </svg>
          </a>
         <a
          href=""
             className="text-neutral-500 hover:text-purple-500 transition-colors"
           >
  {" "}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.241h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
  </svg>
</a>
          </div>
        </div>
        <div>
           <h3 className="text-white font-semibold text-lg mb-4">
  Quick Links
</h3>

<ul className="space-y-2 text-sm">
  <li>
    <a
      href="#"
      className="hover:text-purple-400 transition-all"
    >
      Home
    </a>
  </li>

  <li>
    <a
      href="#trending"
      className="hover:text-purple-400 transition-all"
    >
      Trending
    </a>
  </li>
  <li>
    <a
      href="#popular"
      className="hover:text-purple-400 transition-all"
    >
      Popular
    </a>
  </li>
  <li>
    <a
      href="#top-rated"
      className="hover:text-purple-400 transition-all"
    >
      top Rated
    </a>
  </li>
  <li>
    <a
      href="#genres"
      className="hover:text-purple-400 transition-all"
    >
      Browse by Genre
    </a>
  </li>
</ul> 
        </div>
        <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>

<ul className="space-y-2 text-sm">
  <li>
    <a href="#" className="hover:text-purple-400">About</a>
  </li>

  <li>
    <a href="#" className="hover:text-purple-400">Contact</a>
  </li>

  <li>
    <a href="#" className="hover:text-purple-400">Blog</a>
  </li>

  <li>
    <a href="#" className="hover:text-purple-400">FAQ</a>
  </li>

  <li>
    <a href="#" className="hover:text-purple-400">Help Center</a>
  </li>
</ul>
        </div>
        <div><h3 className="text-white font-semibold text-lg mb-4">
  Newsletter
</h3>

<p className="text-sm mb-4">
  Stay up to date with the latest movies and news
</p>

<form className="space-y-3">
  <div className="relative">
    <input
      type="email"
      placeholder='Your email address'
      className="w-full bg-neutral-800 border-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
    />
  </div>
  <button className='w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-all text-sm'>
    Subscribe

  </button>
</form>

        </div>

  </div>
  <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col md:flex-row justify-between">
  <p className="text-xs">
    &copy; Claire's Cinema. All rights reserved.
    <br className="md:hidden" />
    <span className="hidden md:inline">.</span>
    Powered by{" "}
    <a
      href="#"
      className="text-purple-400 hover:text-purple-300"
    >
      OMDb API
    </a>
  </p>

  <div className="flex space-x-4 mt-4 md:mt-0 text-xs">
    <a
      href="Privacy Policy"
      className="hover:text-purple-400 transition-all"
    >
      Privacy Policy
    </a>
    <a
      href="Privacy Policy"
      className="hover:text-purple-400 transition-all"
    >
       Terms of Services
    </a>
    <a
      href="Privacy Policy"
      className="hover:text-purple-400 transition-all"
    >
      Cookie Policy
    </a>
  </div>
</div>

    </div>
  </footer>

    );
}

export default Footer;
