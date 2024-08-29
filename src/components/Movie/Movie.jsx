import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMovies } from '../../contexts/MovieContext/MovieContext';
import Loading from '../Loading/Loading';

export default function Movie() {
    const { id } = useParams(); // Get the movie ID from the URL
    const { loading, error } = useMovies();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        // Fetch both movie and credits data
        const fetchData = async () => {
            try {
                // Fetch movie details
                const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=032741a31ac2ddb3be55838cbf656b9d&language=en`);
                const movieData = await movieResponse.json();
                setMovie(movieData);

                // Fetch movie credits
                const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=032741a31ac2ddb3be55838cbf656b9d&language=en`);
                const creditsData = await creditsResponse.json();
                setCredits(creditsData.cast.slice(0,10)); // Use `cast` to get actor information
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p className="text-red-500 text-center my-4">Error: {error}</p>;
    }

    if (!movie) {
        return <p className="text-center my-4">Movie not found</p>;
    }

    return (
        <div className="p-4 lg:p-8 max-w-screen-lg mx-auto">
            <div className="flex flex-col md:flex-row bg-gray-500 bg-opacity-30 rounded-lg shadow-lg overflow-hidden">
                <img
                    className="w-full md:w-[40%] h-auto object-cover"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie ? movie.original_title : ""}
                />
                <div className="p-4 md:p-6 flex-1">
                    <h1 className="text-3xl font-bold mb-2">{movie ? movie.title : ""}</h1>
                    <div className="movie__rating mb-4">
                        {movie?.vote_average} ⭐
                        <span className="text-gray-900">{movie?.vote_count ? ` (${movie.vote_count} votes)` : ""}</span>
                    </div>

                    <p className="text-gray-900 mb-4">{movie ? movie.overview : ""}</p>
                    <p className="font-semibold text-purple-900 text-lg mb-2">Genres:</p>
                    <ul className="list-disc list-inside mb-4">
                        {movie.genres && movie.genres.length > 0 ? (
                            movie.genres.map((genre) => (
                                <li key={genre.id} className="text-gray-900">{genre.name}</li>
                            ))
                        ) : (
                            <li className="text-gray-900">No genres available</li>
                        )}
                    </ul>
                   
            
                    
                </div>
            </div>
            <div className="flex flex-col my-2 py-2  bg-gray-500 bg-opacity-30 rounded-lg shadow-lg overflow-hidden">
                    <p className="font-semibold text-lg mb-2">Production Companies:</p>
            <ul className=" px-2 list-disc list-inside mb-4 ">
                        {movie?.production_companies?.map(company => (
                            <div key={company.id} className="flex items-center space-x-2">
                                {company.logo_path && (
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                                        alt={`${company.name} logo`}
                                    />
                                )}
                                <span className="text-gray-900">{company.name}</span>
                            </div>
                        ))}
                    </ul>
                    <p className="font-semibold text-lg mb-2">Cast:</p>
                    
            <ul className="list-disc list-inside grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {credits && credits.length > 0 ? (
                            credits.map((actor) => (
                                <li key={actor.id} className="text-gray-900 flex flex-col items-center">
                                    {actor.profile_path ? (
                                        <img
                                            className="w-24 h-24 rounded-full object-cover mb-2"
                                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                            alt={`${actor.name} profile`}
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-gray-300 mb-2 flex items-center justify-center">
                                            <span>No Image</span>
                                        </div>
                                    )}
                                    <span className="text-center"><h1 className="text-center text-purple-800">
                                        {actor.name}:</h1>{actor.character}</span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-900">No cast information available</li>
                        )}
                    </ul>
            </div>
        </div>
    );
}
