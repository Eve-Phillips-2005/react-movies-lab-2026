
import { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Link } from "react-router";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};

const chip = { margin: 0.5 };

const MovieDetails = ({ movie, credits, recommendations }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        Cast
      </Typography>

      <Stack spacing={2}>
        {credits.cast.slice(0, 5).map((actor) => (
          <Stack
            key={actor.id}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Avatar
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : undefined
              }
              alt={actor.name}
            />
            <Typography>
              {actor.name} as {actor.character}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Typography variant="h5" component="h3">
        Recommended Movies
      </Typography>

      <Stack spacing={2}>
        {recommendations.results.slice(0, 5).map((recommendedMovie) => (
          <Stack
            key={recommendedMovie.id}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Avatar
              variant="rounded"
              src={
                recommendedMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w185${recommendedMovie.poster_path}`
                  : undefined
              }
              alt={recommendedMovie.title}
              sx={{ width: 60, height: 90 }}
            />
            <Typography>
              <Link to={`/movies/${recommendedMovie.id}`}>
                {recommendedMovie.title}
              </Link>
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <Chip
          icon={<AccessTimeIcon />}
          label={`${movie.runtime} min.`}
        />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip
            label="Production Countries"
            sx={{ ...chip }}
            color="primary"
          />
        </li>
        {movie.production_countries.map((c) => (
          <li key={c.name}>
            <Chip label={c.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;