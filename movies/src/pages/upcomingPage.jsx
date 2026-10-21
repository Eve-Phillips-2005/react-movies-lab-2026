import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import PageTemplate from '../components/templateMovieListPage';
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

// Fetch upcoming movies through React Query, which handles
// caching, loading states, and errors automatically
const UpcomingPage = (props) => {
  const { data: movies = [], error, isPending, isError } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // The fetched movies are passed to PageTemplate below
  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />;
      }}
    />
  );
};
export default UpcomingPage;
