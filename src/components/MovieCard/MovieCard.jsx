import React from 'react';
import { Link } from 'react-router-dom';
export default function MovieCard({ id, title, description, image }) {
    return (
        <div className="hover:scale-105 transition-transform duration-300 flex flex-col justify-between items-stretch w-80 h-96 max-w-xs rounded overflow-hidden shadow-lg m-4 mx-auto bg-gray-500 bg-opacity-30 backdrop-blur-md ">
            <div className="flex-grow">
                {/* if(image) */}
                <img className="w-full h-40 object-cover" src={image} alt={title} />
                {/* else
                <img className="w-full h-40 object-cover" src={logo} alt={title} /> */}
                <div className="px-4 py-3">
                    <div className="font-bold text-lg mb-2 truncate">{title}</div>
                    <p className="text-gray-700 text-sm max-w-full max-h-[100px] overflow-y-clip">{description}</p>
                </div>
            </div>
            <div className="text-center px-4 pt-4 pb-2">
                <Link to={`/movies/${id}`} className="text-purple-800 font-semibold hover:text-purple-600">
                    Know More
                </Link>
            </div>
        </div>
    );
}
