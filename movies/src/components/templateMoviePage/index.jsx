
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, Button, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router";
import { getMovieImages } from "../../api/tmdb-api";
import Spinner from "../spinner";

export default function TemplateMoviePage({ movie, children }) {
  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery({
    queryKey: ["images", { id: movie.id }],
    queryFn: getMovieImages,
  });

  const posterPath =
    movie.poster_path || data?.posters?.[0]?.file_path;

  const poster = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : null;

  return (
    <Box
      component="main"
      sx={{
        maxWidth: 1300,
        mx: "auto",
        px: { xs: 2, md: 5 },
        py: { xs: 3, md: 6 },
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ color: "text.secondary", mb: 4 }}
      >
        Back
      </Button>

      <Typography
        sx={{
          color: "#C77B68",
          fontSize: "0.72rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          mb: 1,
        }}
      >
        Film dossier
      </Typography>

      <Typography
        component="h1"
        sx={{
          fontFamily: "Georgia, serif",
          fontSize: { xs: "2.5rem", md: "4rem" },
          lineHeight: 1.1,
          mb: 2,
        }}
      >
        {movie.title}
      </Typography>

      {movie.tagline && (
        <Typography
          sx={{
            color: "text.secondary",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "1.2rem",
            mb: 3,
          }}
        >
          “{movie.tagline}”
        </Typography>
      )}

      {movie.homepage && (
        <Button
          component="a"
          href={movie.homepage}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<OpenInNewIcon />}
          size="small"
          sx={{ mb: 3 }}
        >
          Official website
        </Button>
      )}

      <Divider sx={{ mb: 4 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "280px minmax(0, 1fr)",
          },
          gap: { xs: 4, md: 6 },
          alignItems: "start",
        }}
      >
        <Box>
          {poster ? (
            <Box
              component="img"
              src={poster}
              alt={`${movie.title} theatrical poster`}
              sx={{
                width: "100%",
                maxWidth: { xs: 320, md: "100%" },
                display: "block",
                border: "1px solid #34425A",
              }}
            />
          ) : (
            <Box
              sx={{
                aspectRatio: "2 / 3",
                backgroundColor: "background.paper",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Typography color="text.secondary">
                Poster unavailable
              </Typography>
            </Box>
          )}

          {isPending && <Spinner />}

          {isError && !poster && (
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              Additional artwork could not be loaded.
            </Typography>
          )}
        </Box>

        <Box sx={{ minWidth: 0 }}>{children}</Box>
      </Box>
    </Box>
  );
}