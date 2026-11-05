import { useLocation, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, Button } from "@mui/material";
import { getMovie } from "../api/tmdb-api";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import Spinner from "../components/spinner";

export default function WriteReviewPage() {
  const location = useLocation();
  const movieId = location.state?.movieId;

  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ["movie", { id: movieId }],
    queryFn: getMovie,
    enabled: Boolean(movieId),
  });

  if (!movieId) {
    return (
      <Box sx={{ p: 5 }}>
        <Typography sx={{ mb: 2 }}>
          Select a film from your favourites to write a review.
        </Typography>
        <Button component={Link} to="/movies/favorites">
          View favourites
        </Button>
      </Box>
    );
  }

  if (isPending) return <Spinner />;

  if (isError) {
    return <Typography color="error">{error.message}</Typography>;
  }

  return (
    <PageTemplate movie={movie}>
      <ReviewForm movie={movie} />
    </PageTemplate>
  );
}