import { useParams, Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getActorDetails, getActorMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import {
  Box,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ActorDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: actor,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["actor", { id }],
    queryFn: getActorDetails,
  });

  const {
    data: movieCredits,
    error: creditsError,
    isPending: creditsPending,
    isError: creditsIsError,
  } = useQuery({
    queryKey: ["actorMovieCredits", { id }],
    queryFn: getActorMovieCredits,
  });

  if (isPending || creditsPending) return <Spinner />;

  if (isError || creditsIsError) {
    return (
      <Typography color="error" sx={{ p: 4 }}>
        {error?.message || creditsError?.message}
      </Typography>
    );
  }

  const films = [...(movieCredits.cast || [])]
    .filter((film) => film.release_date)
    .sort((a, b) => b.release_date.localeCompare(a.release_date))
    .slice(0, 10);

  return (
    <Box
      component="main"
      sx={{
        maxWidth: 1200,
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
        People of cinema
      </Typography>

      <Typography
        component="h1"
        sx={{
          fontFamily: "Georgia, serif",
          fontSize: { xs: "2.5rem", md: "4rem" },
          mb: 3,
        }}
      >
        {actor.name}
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "260px minmax(0, 1fr)",
          },
          gap: 5,
          alignItems: "start",
        }}
      >
        <Box>
          {actor.profile_path ? (
            <Box
              component="img"
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              sx={{
                width: "100%",
                maxWidth: 300,
                display: "block",
                border: "1px solid #34425A",
              }}
            />
          ) : (
            <Box
              sx={{
                maxWidth: 300,
                aspectRatio: "2 / 3",
                bgcolor: "background.paper",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Typography color="text.secondary">
                Portrait unavailable
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 3 }}>
            {actor.birthday && (
              <Typography sx={{ fontSize: "0.85rem", mb: 1 }}>
                <Box component="span" sx={{ color: "text.secondary" }}>
                  Born:{" "}
                </Box>
                {actor.birthday}
              </Typography>
            )}

            {actor.place_of_birth && (
              <Typography sx={{ fontSize: "0.85rem" }}>
                <Box component="span" sx={{ color: "text.secondary" }}>
                  Birthplace:{" "}
                </Box>
                {actor.place_of_birth}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            component="h2"
            sx={{
              fontFamily: "Georgia, serif",
              fontSize: "1.8rem",
              mb: 2,
            }}
          >
            Biography
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              lineHeight: 1.9,
              whiteSpace: "pre-line",
              mb: 5,
            }}
          >
            {actor.biography || "No biography available."}
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <Typography
            component="h2"
            sx={{
              fontFamily: "Georgia, serif",
              fontSize: "1.8rem",
              mb: 1,
            }}
          >
            Selected filmography
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ fontSize: "0.8rem", mb: 3 }}
          >
            Ten most recent credited films with release dates
          </Typography>

          {films.length ? films.map((film) => (
            <Box
              key={`${film.id}-${film.character}`}
              component={Link}
              to={`/movies/${film.id}`}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                py: 2,
                borderBottom: "1px solid #34425A",
                color: "inherit",
                textDecoration: "none",
                "&:hover .film-title": {
                  color: "#C77B68",
                },
              }}
            >
              {film.poster_path ? (
                <Box
                  component="img"
                  src={`https://image.tmdb.org/t/p/w185${film.poster_path}`}
                  alt={`${film.title} poster`}
                  sx={{
                    width: 55,
                    height: 82,
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box sx={{ width: 55, height: 82, bgcolor: "#34425A" }} />
              )}

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  className="film-title"
                  sx={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1.1rem",
                  }}
                >
                  {film.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ fontSize: "0.8rem", mt: 0.5 }}
                >
                  {film.release_date.slice(0, 4)}
                  {film.character ? ` · As ${film.character}` : ""}
                </Typography>
              </Box>
            </Box>
          )) : (
            <Typography color="text.secondary">
              No film credits available.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}