import axios from "axios";

import { getImagePosterPath } from "./getImagePosterPath.js";

const API_KEY = "c410d1cc334949387d502ecd46ee90c8";
const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDEwZDFjYzMzNDk0OTM4N2Q1MDJlY2Q0NmVlOTBjOCIsIm5iZiI6MTc0NDk5NTY5NS4yODEsInN1YiI6IjY4MDI4NTZmZTUwNmE4ZTNhMGFkNDcyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.giRls5seaB6oCFxzDy0M6j-I9pSudTFax62QmaLFoLY";

const options = {
  headers: {
    Authorization: TOKEN,
    accept: "application/json",
  },
};

export const fetchTrendingMovies = async (page = 1, controller) => {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/day?language=en-US&page=${page}`,
    {
      ...options,
      signal: controller?.signal,
    }
  );
  const movies = response.data.results.map(({ id, title, poster_path }) => {
    return {
      id,
      title,
      posterPath: getImagePosterPath(poster_path),
    };
  });
  return { movies, totalPages: response.data.total_pages };
};

export const fetchMoviePageQuery = async (query, page = 1, controller) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&language=en-US&page=${page}&include_adult=false`,
    {
      ...options,
      signal: controller?.signal,
    }
  );
  const movies = response.data.results.map(({ id, title, poster_path }) => {
    return {
      id,
      title,
      posterPath: getImagePosterPath(poster_path),
    };
  });
  return {
    movies,
    totalPages: response.data.total_pages,
    totalResults: response.data.total_results,
  };
};

export const fetchMovieDetails = async (movieId, controller) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?language=en-US`,
    {
      ...options,
      signal: controller?.signal,
    }
  );

  const { title, poster_path, overview, genres, vote_average, release_date } =
    response.data;

  return {
    title,
    posterPath: getImagePosterPath(poster_path),
    overview,
    genres: genres.map((genre) => genre.name).join(", "),
    vote: vote_average.toFixed(1),
    year: release_date.slice(0, 4),
  };
};

export const fetchMovieCredits = async (movieId, controller) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?language=en-US`,
    {
      ...options,
      signal: controller?.signal,
    }
  );

  const actors = response.data.cast.map(
    ({ id, name, profile_path, character }) => {
      return {
        id,
        name,
        profile_path: getImagePosterPath(profile_path),
        character,
      };
    }
  );
  return actors;
};

export const fetchMovieReviews = async (movieId, controller) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?language=en-US&page=1`,
    {
      ...options,
      signal: controller?.signal,
    }
  );

  const reviews = response.data.results.map(({ id, author, content }) => ({
    id,
    author,
    content,
  }));

  return reviews;
};
