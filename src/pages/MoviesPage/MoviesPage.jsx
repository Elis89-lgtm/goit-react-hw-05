import { useEffect, useState } from "react";
import { fetchMoviePageQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [moviesPage, setMoviesPage] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const { movies } = await fetchMoviePageQuery(query, 1, controller);
        setMoviesPage(movies);
      } catch (error) {
        console.error("Error while loading:", error);
      }
    };
    getData();
    return () => controller.abort();
  }, [query]);

  const handleChangeQuery = (newValue) => {
    if (!newValue) {
      searchParams.delete("query");
      return setSearchParams(searchParams);
    }
    searchParams.set("query", newValue);

    setSearchParams(searchParams);
  };

  return (
    <div>
      <h2>Movies</h2>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      <MovieList movies={moviesPage} />
    </div>
  );
};
export default MoviesPage;
