import React, { useEffect } from 'react';

import Loading from '../../Loading/Loading';
import MovieCard from '../../MovieCard/MovieCard';
import { useMovies } from '../../../contexts/MovieContext/MovieContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 z-10 p-3 bg-purple-600 text-white rounded-full hover:bg-purple-800 transition-all"
      style={{ top: '50%', transform: 'translateY(-50%)', left: '-2rem' }}
    >
      <FaArrowLeft size={20} />
    </button>
  );
};

// Custom Right Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 z-10 p-3 bg-purple-600 text-white rounded-full hover:bg-purple-800 transition-all"
      style={{ top: '50%', transform: 'translateY(-50%)', right: '-2rem' }}
    >
      <FaArrowRight size={20} />
    </button>
  );
};



export default function Romance() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,  // Default slides to show
    slidesToScroll: 1,
    arrows: true, // Enable arrows
    prevArrow: <PrevArrow />, // Use custom prev arrow
    nextArrow: <NextArrow />, // Use custom next arrow
    autoplay: true,
    autoplaySpeed: 2950,
    pauseOnHover: true,
    responsive: [  // Responsive breakpoints
      {
        breakpoint: 1080, // Screen width up to 1024px
        settings: {
          slidesToShow: 2, // Show 3 slides on medium screens
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 740, // Screen width up to 768px
        settings: {
          slidesToShow: 1, // Show 2 slides on small screens
          slidesToScroll: 1,
        },
      },
     
    ],
  };

  const { romanceMovies, fetchRomanceMovies, loading, error } = useMovies();

  useEffect(() => {
    fetchRomanceMovies(); // Fetch trending movies on component mount
  }, [fetchRomanceMovies]); // Ensure fetchTrendingMovies is stable or memoized

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500 text-center my-4">Error: {error}</p>;
  }

  return (
    <>

<div className='text-start mx-8 flex text-4xl gap-2'>
                
                <h2 className="text-center sm:text-end text-2xl md:text-4xl font-bold sm:text-3xl  py-1 ">
                    Romance
                </h2>
            </div>

    <div className="w-[95%] max-w-6xl mx-auto p-6 relative">
    <Slider {...settings}>
      {romanceMovies.map((movie, index) => (
        <MovieCard 
        key={movie.id}
        id={movie.id}
        title={movie.title}
        description={movie.overview}
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
      ))}
    </Slider>
  
  </div>
      </>
  );
}
