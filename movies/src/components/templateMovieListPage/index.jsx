import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortOrder, setSortOrder] = useState("default");

  const genreId = Number(genreFilter);

  // Filter movies by title and genre.
  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().includes(nameFilter.toLowerCase());
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  // Sort the filtered results without modifying the original array.
  displayedMovies = [...displayedMovies].sort((a, b) => {
    switch (sortOrder) {
      case "title-asc":
        return a.title.localeCompare(b.title);

      case "title-desc":
        return b.title.localeCompare(a.title);

      case "rating-desc":
        return b.vote_average - a.vote_average;

      case "date-desc":
        return new Date(b.release_date) - new Date(a.release_date);

      default:
        return 0;
    }
  });

  // Update the relevant filter or sorting state.
  const handleChange = (type, value) => {
    if (type === "name") {
      setNameFilter(value);
    } else if (type === "genre") {
      setGenreFilter(value);
    } else if (type === "sort") {
      setSortOrder(value);
    }
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>

      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            sortOrder={sortOrder}
          />
        </Grid>

        <MovieList action={action} movies={displayedMovies} />
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;