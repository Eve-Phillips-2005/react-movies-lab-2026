import { Box, CircularProgress } from "@mui/material";

// Show a loading indicator
export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        py: 4,
      }}
    >
      <CircularProgress />
    </Box>
  );
}