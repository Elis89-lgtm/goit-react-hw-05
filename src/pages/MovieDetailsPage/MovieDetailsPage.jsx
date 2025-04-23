import { useEffect, useRef, useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";

import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const goBackRef = useRef(location.state || "/");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    // setTimeout(() => {
    //   navigate('/');
    // }, 4000);
  }, [movieId]);
  if (!movieDetails) return <p>Loading...</p>;

  const { title, posterPath, overview, genres, vote, year } = movieDetails;
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        {title} ({year})
      </h2>
      <button onClick={() => navigate(goBackRef.current)}>Go back</button>
      <div className={styles.contentWrapper}>
        <img src={posterPath} alt={title} className={styles.poster} />
        <div className={styles.details}>
          <p>
            <strong>User score:</strong>
            {vote}%
          </p>
          <p>
            <strong>Overview:</strong>
            {overview}
          </p>
          <p>
            <strong>Genres:</strong>
            {genres}
          </p>
        </div>
      </div>
      <div className={styles.additional}>
        <h3>Additional information</h3>
        <nav className={styles.nav}>
          <NavLink
            to="cast"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Cast
          </NavLink>
          <NavLink
            to="reviews"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Reviews
          </NavLink>
        </nav>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
