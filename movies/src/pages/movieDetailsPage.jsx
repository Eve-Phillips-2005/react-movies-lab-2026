import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits, getMovieRecommendations } from '../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const MoviePage = (props) => {
  const { id } = useParams();

  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ['movie', { id: id }],
    queryFn: getMovie,
  })

  const {
    data: credits,
    error: creditsError,
    isPending: creditsPending,
    isError: creditsIsError,
  } = useQuery({
    queryKey: ["credits", { id: id }],
    queryFn: getMovieCredits,
  });

  const {
    data: recommendations,
    error: recommendationsError,
    isPending: recommendationsPending,
    isError: recommendationsIsError,
  } = useQuery({
    queryKey: ["recommendations", { id: id }],
    queryFn: getMovieRecommendations,
  });

  if (isPending || creditsPending || recommendationsPending) {
    return <Spinner />;
  }

  if (isError || creditsIsError) {
    return <h1>{isError ? error.message : creditsError.message}</h1>;
  }

  if (recommendationsIsError) {
    return <h1>{recommendationsError.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} credits={credits} recommendations={recommendations} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;