import { useContext } from "react";
import { Link } from "react-router";
import { MoviesContext } from "../../contexts/moviesContextDefinition.js";
import {
  Card,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import img from "../../images/film-poster-placeholder.png";

export default function MovieCard({ movie, action }) {
  const { favorites } = useContext(MoviesContext);
  const isFavorite = favorites.includes(movie.id);

  // Use a placeholder when no poster is available
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : img;

  const year = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "TBA";

  const rating = Number.isFinite(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : "N/A";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1B2940",
        border: "1px solid #34425A",
        borderRadius: "3px",
        overflow: "hidden",
        transition: "border-color 0.2s ease",
        "&:hover": {
          borderColor: "#A4A2C9",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={poster}
          alt={`${movie.title} poster`}
          sx={{
            display: "block",
            width: "100%",
            aspectRatio: "2 / 3",
            objectFit: "cover",
          }}
        />

        {isFavorite && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#101827",
              p: 0.8,
              display: "flex",
              border: "1px solid #34425A",
            }}
          >
            <FavoriteIcon
              sx={{ fontSize: 18, color: "#C77B68" }}
            />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          px: 2,
          pt: 2,
          pb: 1,
          flexGrow: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: "1.12rem",
            lineHeight: 1.35,
            minHeight: "3rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {movie.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1.5,
          }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.8rem",
            }}
          >
            {year}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <StarIcon sx={{ fontSize: 16, color: "#C77B68" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>
              {rating}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          px: 1,
          py: 0.8,
          borderTop: "1px solid #34425A",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {action?.(movie)}
        </Box>

        <Tooltip title="View film details">
          <IconButton
            component={Link}
            to={`/movies/${movie.id}`}
            aria-label={`View details for ${movie.title}`}
            size="small"
            sx={{
              color: "#E7DDCC",
              "&:hover": { color: "#C77B68" },
            }}
          >
            <ArrowOutwardIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}
