import React from "react";
import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies = [] }) => {
  const location = useLocation();

  return (
    <div>
      <ul>
        {movies.map((item) => (
          <li key={item.id}>
            <Link state={{ from: location }} to={`${item.id}`}>
              {item.title || item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MovieList;
