import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMovies } from '../../contexts/MovieContext/MovieContext';
import logo from '../../assets/logoo.png';

function Header() {
    const { fetchMovies } = useMovies(); // Destructure context values
    const [query, setQuery] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSearch = () => {
        if (query) {
            fetchMovies(query); // Fetch movies based on search query
            navigate('/Results'); // Navigate to results page
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission
            handleSearch(); // Trigger search
        }
    };

    return (
        <header className="shadow sticky z-50 top-0 bg-gray-500 bg-opacity-30 backdrop-blur-md">
            <nav className="bg-gray-500 bg-opacity-30 backdrop-blur-md border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img 
                            src={logo}
                            className="mr-3 h-12 rounded-full border-4 border-black"
                            alt="Logo"
                        />
                        <div className='hidden sm:flex text-start mx-8  text-4xl gap-2'>
                <h2 className="text-center sm:text-end text-2xl md:text-4xl font-bold sm:text-3xl py-1">
                    Movie 
                </h2>
                <h2 className="text-center sm:text-end text-2xl md:text-4xl font-bold sm:text-3xl text-purple-700 py-1">
                    Nation 
                </h2>
            </div>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <div
                            className="text-black bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-purple-800 font-medium rounded-lg text-sm px-1 lg:px-1 py-1 lg:py-1 mr-2 focus:outline-none"
                        >
                            <form action="">

                            <div className='rounded-sm flex gap-1'>
                                <input 
                                id='search'
                                name='search'
                                    type="text" 
                                    value={query} 
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown} // Add this line
                                    placeholder="Search for a movie..."  
                                    className='rounded-s-md py-1 px-1 bg-white focus:outline-none focus:border-none focus:shadow-none'
                                    />
                                <button 
                                    onClick={handleSearch} 
                                    className='w-[35px] bg-purple-500 h-[30px] rounded-e-md'
                                    >
                                    <h1>🔍</h1>
                                </button>
                            </div>
                                    </form>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
