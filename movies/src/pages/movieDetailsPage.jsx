import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits } from '../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const MoviePage = (props) => {
  const { id } = useParams();

  const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id: id}],
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

if (isPending || creditsPending) {
  return <Spinner />;
}

  if (isError || creditsIsError) {
    return <h1>{isError ? error.message : creditsError.message}</h1>;
  }


  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} credits={credits} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
