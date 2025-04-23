import { fetchMovieCredits } from "../../services/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      try {
        const data = await fetchMovieCredits(movieId, controller);
        setMovieCast(data);
      } catch (error) {
        setError("Failed to load cast");
        console.log(error);
      }
    };
    getData();
    return () => controller.abort();
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      {error && <p>{error}</p>}
      <ul>
        {movieCast.length === 0 && <li>Information missing</li>}
        {movieCast.map((actor) => (
          <li key={actor.id}>
            <img src={actor.profile_path} alt={actor.name} width="100" />
            <p>{actor.name}</p>
            <p>Character:{actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
