import { useState } from "react";
import { Link } from "react-router";
import {
  Box,
  Typography,
  Divider,
  Chip,
  Button,
  Drawer,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import MovieReviews from "../movieReviews";

const sectionHeading = {
  fontFamily: "Georgia, serif",
  fontSize: "1.7rem",
  mb: 2,
};

const sectionLabel = {
  fontSize: "0.7rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#C77B68",
  mb: 1,
};

export default function MovieDetails({
  movie,
  credits,
  recommendations,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const cast = credits?.cast?.slice(0, 5) || [];
  const suggested = recommendations?.results?.slice(0, 5) || [];

  const facts = [
    ["Release", movie.release_date || "Unknown"],
    ["Runtime", movie.runtime ? `${movie.runtime} min` : "Unknown"],
    ["Original language", movie.original_language?.toUpperCase() || "—"],
    ["Revenue", movie.revenue ? `$${movie.revenue.toLocaleString()}` : "—"],
  ];

  return (
    <Box>
      <Typography sx={sectionLabel}>Synopsis</Typography>

      <Typography sx={sectionHeading} component="h2">
        The story
      </Typography>

      <Typography
        sx={{
          lineHeight: 1.9,
          color: "text.secondary",
          fontSize: "1rem",
          mb: 4,
        }}
      >
        {movie.overview || "No synopsis is available."}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            sm: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 4,
        }}
      >
        {facts.map(([label, value]) => (
          <Box key={label}>
            <Typography sx={sectionLabel}>{label}</Typography>
            <Typography sx={{ fontSize: "0.9rem" }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
        {movie.genres?.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            variant="outlined"
            size="small"
            sx={{ borderColor: "#34425A", borderRadius: "2px" }}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 5,
        }}
      >
        <StarIcon sx={{ color: "#C77B68" }} />
        <Typography sx={{ fontSize: "1.1rem" }}>
          {movie.vote_average?.toFixed(1) || "N/A"} / 10
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
          ({movie.vote_count?.toLocaleString() || 0} votes)
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Typography sx={sectionLabel}>People</Typography>
      <Typography component="h2" sx={sectionHeading}>
        Principal cast
      </Typography>

      <Box sx={{ mb: 5 }}>
        {cast.length ? cast.map((actor) => (
          <Box
            key={actor.id}
            component={Link}
            to={`/actors/${actor.id}`}
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              py: 1.5,
              borderBottom: "1px solid #34425A",
              textDecoration: "none",
              color: "inherit",
              "&:hover .actor-name": { color: "#C77B68" },
            }}
          >
            {actor.profile_path ? (
              <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                sx={{
                  width: 48,
                  height: 64,
                  objectFit: "cover",
                }}
              />
            ) : (
              <Box sx={{ width: 48, height: 64, bgcolor: "#34425A" }} />
            )}

            <Box>
              <Typography className="actor-name" sx={{ fontWeight: 600 }}>
                {actor.name}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                {actor.character || "Cast member"}
              </Typography>
            </Box>
          </Box>
        )) : (
          <Typography color="text.secondary">
            Cast information unavailable.
          </Typography>
        )}
      </Box>

      <Typography sx={sectionLabel}>Further viewing</Typography>
      <Typography component="h2" sx={sectionHeading}>
        Recommended films
      </Typography>

      <Box sx={{ display: "grid", gap: 1.5, mb: 5 }}>
        {suggested.length ? suggested.map((film) => (
          <Box
            key={film.id}
            component={Link}
            to={`/movies/${film.id}`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: "inherit",
              textDecoration: "none",
              borderBottom: "1px solid #34425A",
              pb: 1.5,
              "&:hover": { color: "#C77B68" },
            }}
          >
            {film.poster_path ? (
              <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w185${film.poster_path}`}
                alt={`${film.title} poster`}
                sx={{ width: 48, height: 72, objectFit: "cover" }}
              />
            ) : (
              <Box sx={{ width: 48, height: 72, bgcolor: "#34425A" }} />
            )}

            <Typography sx={{ fontFamily: "Georgia, serif" }}>
              {film.title}
            </Typography>
          </Box>
        )) : (
          <Typography color="text.secondary">
            No recommendations available.
          </Typography>
        )}
      </Box>

      <Button
        variant="outlined"
        onClick={() => setDrawerOpen(true)}
        sx={{ borderColor: "#A4A2C9", mb: 2 }}
      >
        Read audience reviews
      </Button>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 520 },
            bgcolor: "#101827",
            p: 3,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography sx={{ fontFamily: "Georgia, serif", fontSize: "1.8rem" }}>
            Audience reviews
          </Typography>
          <IconButton
            aria-label="Close reviews"
            onClick={() => setDrawerOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <MovieReviews movie={movie} />
      </Drawer>
    </Box>
  );
}