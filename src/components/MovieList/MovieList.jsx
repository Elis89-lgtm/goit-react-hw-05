import React from "react";
import { Link, useLocation } from "react-router-dom";

const MovieList = ({ data }) => {
  const location = useLocation();

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <Link state={location} to={`${item.id}`}>
              {item.movieName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MovieList;
