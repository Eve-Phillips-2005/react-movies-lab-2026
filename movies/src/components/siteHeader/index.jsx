import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";

const menuOptions = [
  { label: "Discover", path: "/" },
  { label: "Popular", path: "/movies/popular" },
  { label: "Top Rated", path: "/movies/top_rated" },
  { label: "Now Playing", path: "/movies/now_playing" },
  { label: "Upcoming", path: "/movies/upcoming" },
  { label: "Favourites", path: "/movies/favorites" },
  { label: "My Playlist", path: "/movies/playlist" },
];

export default function SiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  // Close the menu before changing pages
  const handleNavigate = (path) => {
    setAnchorEl(null);
    navigate(path);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "#101827",
          borderBottom: "1px solid #34425A",
        }}
      >
        <Toolbar
          sx={{
            minHeight: 76,
            px: { xs: 2, md: 4 },
            gap: 3,
          }}
        >
          <Box
            onClick={() => handleNavigate("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <LocalMoviesOutlinedIcon
              sx={{ color: "#C77B68", fontSize: 30 }}
            />

            <Box>
              <Typography
                sx={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.35rem",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                The Screening Room
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "0.62rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  mt: 0.5,
                }}
              >
                A personal film catalogue
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            component="nav"
            sx={{
              display: { xs: "none", xl: "flex" },
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {menuOptions.map((option) => {
              const active = location.pathname === option.path;

              return (
                <Button
                  key={option.path}
                  onClick={() => handleNavigate(option.path)}
                  sx={{
                    color: active ? "#E7DDCC" : "#B6B8C8",
                    borderBottom: active
                      ? "2px solid #C77B68"
                      : "2px solid transparent",
                    borderRadius: 0,
                    px: 1.4,
                    py: 1.5,
                    fontSize: "0.8rem",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#E7DDCC",
                    },
                  }}
                >
                  {option.label}
                </Button>
              );
            })}
          </Box>

          <IconButton
            aria-label="Open navigation menu"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{
              display: { xs: "flex", xl: "none" },
              color: "text.primary",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: {
                backgroundColor: "#1B2940",
                minWidth: 210,
                mt: 1,
              },
            }}
          >
            {menuOptions.map((option, index) => (
              <Box key={option.path}>
                {index === 5 && <Divider sx={{ my: 1 }} />}
                <MenuItem
                  selected={location.pathname === option.path}
                  onClick={() => handleNavigate(option.path)}
                >
                  {option.label}
                </MenuItem>
              </Box>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}