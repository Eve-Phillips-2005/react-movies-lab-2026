import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../api/tmdb-api";
import Spinner from "../spinner";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

export default function FilterMoviesCard(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isPending) return <Spinner />;
  if (isError) return <Typography>{error.message}</Typography>;

  const genres = [
    { id: "0", name: "All genres" },
    ...data.genres,
  ];

  const fieldStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#101827",
      borderRadius: "3px",
    },
  };

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        p: 2.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
        <TuneIcon sx={{ color: "#C77B68" }} />
        <Typography
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: "1.3rem",
          }}
        >
          Refine collection
        </Typography>
      </Box>

      <Typography
        sx={{
          mt: 1,
          mb: 2.5,
          color: "text.secondary",
          fontSize: "0.8rem",
          lineHeight: 1.7,
        }}
      >
        Find a film by title, genre or rating.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextField
          fullWidth
          label="Search titles"
          type="search"
          size="small"
          value={props.titleFilter}
          onChange={(e) => props.onUserInput("name", e.target.value)}
          sx={fieldStyles}
        />

        <FormControl fullWidth size="small" sx={fieldStyles}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            value={props.genreFilter}
            label="Genre"
            onChange={(e) => props.onUserInput("genre", e.target.value)}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small" sx={fieldStyles}>
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            value={props.sortOrder}
            label="Sort by"
            onChange={(e) => props.onUserInput("sort", e.target.value)}
          >
            <MenuItem value="default">Default order</MenuItem>
            <MenuItem value="title-asc">Title: A–Z</MenuItem>
            <MenuItem value="title-desc">Title: Z–A</MenuItem>
            <MenuItem value="rating-desc">Highest rated</MenuItem>
            <MenuItem value="date-desc">Newest first</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}