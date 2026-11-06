import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContextDefinition.js";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const { favorites: movieIds } = useContext(MoviesContext);

  // Load saved favourite movies
  const favoriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    })),
  });

  const isPending = favoriteMovieQueries.some((q) => q.isPending);
  const isError = favoriteMovieQueries.some((q) => q.isError);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>Failed to load favourite movies</h1>;
  }

  const movies = favoriteMovieQueries.map((q) => ({
    ...q.data,
    genre_ids: q.data.genres.map((genre) => genre.id),
  }));

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromFavorites movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default FavoriteMoviesPage;