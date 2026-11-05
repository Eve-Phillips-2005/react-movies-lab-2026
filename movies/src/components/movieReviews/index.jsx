import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Box, Typography, Divider, Button } from "@mui/material";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import Spinner from "../spinner";

export default function MovieReviews({ movie }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["reviews", { id: movie.id }],
    queryFn: getMovieReviews,
  });

  if (isPending) return <Spinner />;

  if (isError) {
    return <Typography color="error">{error.message}</Typography>;
  }

  const reviews = data?.results || [];

  if (!reviews.length) {
    return (
      <Typography color="text.secondary">
        No audience reviews are available for this film.
      </Typography>
    );
  }

  return (
    <Box>
      {reviews.map((review, index) => (
        <Box key={review.id} sx={{ mb: 3 }}>
          <Typography
            sx={{
              color: "#C77B68",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              mb: 1,
            }}
          >
            REVIEW {String(index + 1).padStart(2, "0")}
          </Typography>

          <Typography
            sx={{
              fontFamily: "Georgia, serif",
              fontSize: "1.2rem",
              mb: 1.5,
            }}
          >
            {review.author}
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.88rem",
              lineHeight: 1.8,
              overflowWrap: "anywhere",
              mb: 1.5,
            }}
          >
            {excerpt(review.content)}
          </Typography>

          <Button
            component={Link}
            to={`/reviews/${review.id}`}
            state={{ review, movie }}
            size="small"
            sx={{ px: 0 }}
          >
            Read full review
          </Button>

          <Divider sx={{ mt: 2.5 }} />
        </Box>
      ))}
    </Box>
  );
}