import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

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
    <div>
      <h2>
        {title} ({year})
      </h2>
      <button onClick={() => navigate(goBackRef.current)}>Go back</button>

      {posterPath && <img src={posterPath} alt={title} />}
      <p>
        <strong>User score:</strong>
        {vote}
      </p>
      <p>
        <strong>Overview:</strong>
        {overview}
      </p>
      <p>
        <strong>Genres:</strong>
        {genres}
      </p>
      <nav>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
