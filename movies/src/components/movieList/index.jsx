import Movie from "../movieCard";
import Grid from "@mui/material/Grid";

// Display movies in a grid
export default function MovieList({ movies, action }) {
  return (
    <Grid container spacing={2.5}>
      {movies.map((movie) => (
        <Grid
          key={movie.id}
          size={{ xs: 12, sm: 6, md: 4, xl: 3 }}
        >
          <Movie movie={movie} action={action} />
        </Grid>
      ))}
    </Grid>
  );
}