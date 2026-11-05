import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContextDefinition.js";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

const ratings = [
  { value: 5, label: "Excellent" },
  { value: 4, label: "Good" },
  { value: 3, label: "Average" },
  { value: 2, label: "Poor" },
  { value: 0, label: "Terrible" },
];

const defaultValues = {
  author: "",
  review: "",
  rating: 3,
};

export default function ReviewForm({ movie }) {
  const { addReview } = useContext(MoviesContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (values) => {
    addReview(movie, {
      ...values,
      movieId: movie.id,
      rating: Number(values.rating),
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/movies/favorites");
  };

  return (
    <Box sx={{ maxWidth: 700 }}>
      <Typography
        sx={{
          color: "#C77B68",
          fontSize: "0.72rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          mb: 1,
        }}
      >
        Personal collection
      </Typography>

      <Typography
        component="h2"
        sx={{
          fontFamily: "Georgia, serif",
          fontSize: { xs: "2rem", md: "2.5rem" },
          mb: 1,
        }}
      >
        Write a review
      </Typography>

      <Typography color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
        Record your thoughts on {movie.title}.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Controller
          name="author"
          control={control}
          rules={{ required: "Name is required." }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Your name"
              required
              fullWidth
              error={Boolean(errors.author)}
              helperText={errors.author?.message}
            />
          )}
        />

        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Your rating"
              helperText="Choose how you would rate this film."
            >
              {ratings.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="review"
          control={control}
          rules={{
            required: "Review cannot be empty.",
            minLength: {
              value: 10,
              message: "Please write at least 10 characters.",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Your review"
              multiline
              minRows={8}
              fullWidth
              required
              error={Boolean(errors.review)}
              helperText={
                errors.review?.message ||
                "What did you think of the film?"
              }
            />
          )}
        />

        <Divider />

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button type="submit" variant="contained" color="primary">
            Save review
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={() => reset(defaultValues)}
          >
            Clear form
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={handleClose}
          action={
            <Button color="inherit" size="small" onClick={handleClose}>
              Continue
            </Button>
          }
        >
          Review saved successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
}