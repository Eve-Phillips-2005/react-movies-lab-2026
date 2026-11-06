import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme";
import MoviesContextProvider from "./contexts/moviesContext.jsx";

import HomePage from "./pages/homePage";
import UpcomingPage from "./pages/upcomingPage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import PlaylistPage from "./pages/playlistPage";

import SiteHeader from "./components/siteHeader";

// Set up React Query caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <BrowserRouter>
          <SiteHeader />

          <MoviesContextProvider>
            {/* Application routes */}
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route
                path="/movies/favorites"
                element={<FavoriteMoviesPage />}
              />

              <Route
                path="/movies/playlist"
                element={<PlaylistPage />}
              />

              <Route
                path="/movies/upcoming"
                element={<UpcomingPage />}
              />

              <Route
                path="/movies/popular"
                element={<PopularMoviesPage />}
              />

              <Route
                path="/movies/top_rated"
                element={<TopRatedMoviesPage />}
              />

              <Route
                path="/movies/now_playing"
                element={<NowPlayingMoviesPage />}
              />

              <Route
                path="/movies/:id"
                element={<MoviePage />}
              />

              <Route
                path="/actors/:id"
                element={<ActorDetailsPage />}
              />

              <Route
                path="/reviews/:id"
                element={<MovieReviewPage />}
              />

              <Route
                path="/reviews/form"
                element={<AddMovieReviewPage />}
              />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
      </ThemeProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}