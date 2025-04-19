import { useEffect, useState } from "react";

import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    fetchTrendingMovies(1, controller)
      .then(({ movies: trending }) => setMovies(trending))
      .catch(console.error);
    return () => controller.abort();
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </main>
  );
};

export default HomePage;
