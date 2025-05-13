import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className={`bg-gray-800 p-3 rounded-lg mb-3 w-40 ${movie.link ? 'cursor-pointer' : ''}`}
      onClick={() => movie.link && navigate(movie.link)}
    >
      {movie.multiLine ? (
        movie.title.split('\n').map((line, i) => (
          <p key={i} className="font-bold">{line}</p>
        ))
      ) : (
        <p className="font-bold">{movie.title}</p>
      )}
      <p className="text-gray-400 text-sm">{movie.genre}</p>
    </div>
  );
};

export default MovieCard;