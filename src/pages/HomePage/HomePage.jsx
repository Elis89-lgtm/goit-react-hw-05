import { useEffect, useState } from "react";

import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import axios from "axios";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetchTrendingMovies(1, controller)
      .then(({ movies: trending }) => setMovies(trending))
      .catch((error) => {
        if (axios.isCancel(error) || error.name === "CanceledError") {
          console.log("Кequest canceled");
          return;
        }
        console.error(error);
      });
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
