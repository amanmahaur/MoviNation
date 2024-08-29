import React, { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import MovieCard from '../MovieCard/MovieCard';
import { useMovies } from '../../contexts/MovieContext/MovieContext';

function Results() {
    const [loading, setLoading] = useState(true);
    const { movies, error } = useMovies();
    
    useEffect(() => {
        // Simulate loading process
        setTimeout(() => {
            setLoading(false);  // Set loading to false after 1 second
        }, 1000);
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p className="text-red-500 text-center my-4">Error: {error}</p>;
    }

    return (
        <>
            <div className='text-start mx-8 flex text-4xl gap-2'>
                <h2 className="text-center sm:text-end text-2xl md:text-4xl font-bold sm:text-3xl py-1">
                    Search 
                </h2>
                <h2 className="text-center sm:text-end text-2xl md:text-4xl font-bold sm:text-3xl text-purple-700 py-1">
                    Results 
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-12 mx-4">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        description={movie.overview}
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                ))}
            </div>
        </>
    );
}

export default Results;
