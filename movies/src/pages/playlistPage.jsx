
import { useContext } from "react";
import { useQueries } from "@tanstack/react-query";
import { MoviesContext } from "../contexts/moviesContext";
import { getMovie } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import Typography from "@mui/material/Typography";

const PlaylistPage = () => {
  const { playlist, removeFromPlaylist } = useContext(MoviesContext);

  const movieQueries = useQueries({
    queries: playlist.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    })),
  });

  const isPending = movieQueries.some((query) => query.isPending);
  const isError = movieQueries.some((query) => query.isError);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography>Failed to load playlist movies.</Typography>;
  }

  if (playlist.length === 0) {
    return (
      <Typography variant="h5" sx={{ m: 3 }}>
        Your playlist is empty.
      </Typography>
    );
  }

  const movies = movieQueries.map((query) => ({
    ...query.data,
    genre_ids: query.data.genres.map((genre) => genre.id),
  }));

  return (
    <PageTemplate
      title="My Playlist"
      movies={movies}
      action={(movie) => (
        <IconButton
          aria-label="remove from playlist"
          onClick={(event) => {
            event.preventDefault();
            removeFromPlaylist(movie);
          }}
        >
          <PlaylistRemoveIcon color="primary" fontSize="large" />
        </IconButton>
      )}
    />
  );
};

export default PlaylistPage;