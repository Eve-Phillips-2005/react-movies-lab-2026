import { useParams } from "react-router";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import {
  getMovie,
  getMovieCredits,
  getMovieRecommendations,
} from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const MoviePage = () => {
  // Get the movie id from the URL
  const { id } = useParams();

  // Get the main movie details
  const {
    data: movie,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
  });

  // Get the movie cast and credits
  const {
    data: credits,
    error: creditsError,
    isPending: creditsPending,
    isError: creditsIsError,
  } = useQuery({
    queryKey: ["credits", { id }],
    queryFn: getMovieCredits,
  });

  // Get recommended movies
  const {
    data: recommendations,
    error: recommendationsError,
    isPending: recommendationsPending,
    isError: recommendationsIsError,
  } = useQuery({
    queryKey: ["recommendations", { id }],
    queryFn: getMovieRecommendations,
  });

  // Show an error if any request fails
  if (isError || creditsIsError || recommendationsIsError) {
    return (
      <h1>
        {error?.message ||
          creditsError?.message ||
          recommendationsError?.message}
      </h1>
    );
  }

  // Show loading until all requests finish
  if (isPending || creditsPending || recommendationsPending) {
    return <Spinner />;
  }

  return (
    <PageTemplate movie={movie}>
      <MovieDetails
        movie={movie}
        credits={credits}
        recommendations={recommendations}
      />
    </PageTemplate>
  );
};

export default MoviePage;