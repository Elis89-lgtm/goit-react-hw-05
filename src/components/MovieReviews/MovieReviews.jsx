import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movieId) return;
    const controller = new AbortController();
    const getData = async () => {
      try {
        const reviews = await fetchMovieReviews(movieId, controller);
        setMovieReviews(reviews);
      } catch (error) {
        if (error.name !== "CanceledError") {
          setError("Could not load reviews");
          console.error(error);
        }
      }
    };
    getData();

    return () => controller.abort();
  }, [movieId]);
  return (
    <div>
      <h3>Reviews</h3>
      {error && <p>{error}</p>}
      {movieReviews.length === 0 ? (
        <p>There are no reviews for this movie.</p>
      ) : (
        <ul>
          {movieReviews.map(({ id, author, content }) => (
            <li key={id}>
              <h4>{author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
