import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies = [] }) => {
  const location = useLocation();

  return (
    <ul className={styles.movieGrid}>
      {movies.map((item) => (
        <li key={item.id} className={styles.movieItem}>
          <Link state={location} to={`/movies/${item.id}`}>
            {item.posterPath && (
              <img
                src={item.posterPath}
                alt={item.title}
                className={styles.movieImage}
              />
            )}
            <p>{item.title || item.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default MovieList;
