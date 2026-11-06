import { createTheme } from "@mui/material/styles";

// Set the app colours and typography
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#A4A2C9",
      contrastText: "#101827",
    },
    secondary: {
      main: "#C77B68",
    },
    background: {
      default: "#101827",
      paper: "#1B2940",
    },
    text: {
      primary: "#E7DDCC",
      secondary: "#B6B8C8",
    },
    divider: "#34425A",
  },
  typography: {
    fontFamily: '"Trebuchet MS", Arial, sans-serif',
    h1: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: 400,
    },
    h2: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: 400,
    },
    h4: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: 400,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.03em",
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#101827",
        },
        "::selection": {
          backgroundColor: "#A4A2C9",
          color: "#101827",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid #34425A",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 3,
        },
      },
    },
  },
});

export default theme;