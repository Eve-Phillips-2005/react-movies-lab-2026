import { useLocation, Link } from "react-router";
import { Box, Typography, Button } from "@mui/material";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";

export default function MovieReviewPage() {
  const location = useLocation();
  const movie = location.state?.movie;
  const review = location.state?.review;

  if (!movie || !review) {
    return (
      <Box sx={{ p: 5 }}>
        <Typography sx={{ mb: 2 }}>
          Review details are unavailable. Open a review from
          a movie's details page.
        </Typography>
        <Button component={Link} to="/">
          Return to Discover
        </Button>
      </Box>
    );
  }

  return (
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
  );
}