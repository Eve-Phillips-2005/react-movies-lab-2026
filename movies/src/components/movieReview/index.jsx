import { Box, Typography, Divider } from "@mui/material";

export default function MovieReview({ review }) {
  return (
    <Box sx={{ maxWidth: 760 }}>
      <Typography
        sx={{
          color: "#C77B68",
          fontSize: "0.72rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          mb: 1,
        }}
      >
        Audience review
      </Typography>

      <Typography
        component="h2"
        sx={{
          fontFamily: "Georgia, serif",
          fontSize: { xs: "1.8rem", md: "2.4rem" },
          mb: 1,
        }}
      >
        A review by {review.author}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography
        sx={{
          color: "text.secondary",
          fontSize: "1rem",
          lineHeight: 1.95,
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
        }}
      >
        {review.content}
      </Typography>
    </Box>
  );
}