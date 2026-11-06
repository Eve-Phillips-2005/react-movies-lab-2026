import { useState } from "react";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import { Box, Typography, Divider } from "@mui/material";

export default function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortOrder, setSortOrder] = useState("default");

  const genreId = Number(genreFilter);

  // Filter movies by title and genre
  let displayedMovies = movies.filter((movie) => {
    const matchesTitle = movie.title
      .toLowerCase()
      .includes(nameFilter.toLowerCase());

    const matchesGenre =
      genreId === 0 || movie.genre_ids?.includes(genreId);

    return matchesTitle && matchesGenre;
  });

  // Sort the filtered movies
  displayedMovies = displayedMovies.sort((a, b) => {
    switch (sortOrder) {
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "rating-desc":
        return b.vote_average - a.vote_average;
      case "date-desc":
        return (Date.parse(b.release_date) || 0) -
          (Date.parse(a.release_date) || 0);
      default:
        return 0;
    }
  });

  // Update search filter and sort options
  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    if (type === "genre") setGenreFilter(value);
    if (type === "sort") setSortOrder(value);
  };

  return (
    <Box
      component="main"
      sx={{
        maxWidth: "1600px",
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            color: "#C77B68",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            mb: 1.5,
          }}
        >
          The collection
        </Typography>

        <Typography
          component="h1"
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: { xs: "2.4rem", md: "3.4rem" },
            lineHeight: 1.15,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "0.85rem",
            mt: 1.5,
          }}
        >
          Explore films, discover favourites, and build your collection.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "250px minmax(0, 1fr)",
          },
          gap: 3,
          alignItems: "start",
        }}
      >
        <FilterCard
          onUserInput={handleChange}
          titleFilter={nameFilter}
          genreFilter={genreFilter}
          sortOrder={sortOrder}
        />

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            {displayedMovies.length} films displayed
          </Typography>

          {displayedMovies.length > 0 ? (
            <MovieList
              movies={displayedMovies}
              action={action}
            />
          ) : (
            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                p: 5,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.5rem",
                  mb: 1,
                }}
              >
                No films found
              </Typography>

              <Typography color="text.secondary">
                Try changing your search or genre selection.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}