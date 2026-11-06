import { useState, useEffect } from "react";
import { MoviesContext } from "./moviesContextDefinition.js";

const MoviesContextProvider = (props) => {
  // Load saved data from local storage
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [myReviews, setMyReviews] = useState(() => {
    const savedReviews = localStorage.getItem("myReviews");
    return savedReviews ? JSON.parse(savedReviews) : {};
  });

  const [playlist, setPlaylist] = useState(() => {
    const savedPlaylist = localStorage.getItem("playlist");
    return savedPlaylist ? JSON.parse(savedPlaylist) : [];
  });

  // Save changes to local storage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("myReviews", JSON.stringify(myReviews));
  }, [myReviews]);

  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  // Add a movie to favourites if it is not already saved
  const addToFavorites = (movie) => {
    setFavorites((current) =>
      current.includes(movie.id)
        ? current
        : [...current, movie.id]
    );
  };

  const removeFromFavorites = (movie) => {
    setFavorites((current) =>
      current.filter((movieId) => movieId !== movie.id)
    );
  };

  // Save a review for a movie
  const addReview = (movie, review) => {
    setMyReviews((current) => ({
      ...current,
      [movie.id]: review,
    }));
  };

  // Add a movie to the playlist if it is not already saved
  const addToPlaylist = (movie) => {
    setPlaylist((current) =>
      current.includes(movie.id)
        ? current
        : [...current, movie.id]
    );
  };

  const removeFromPlaylist = (movie) => {
    setPlaylist((current) =>
      current.filter((movieId) => movieId !== movie.id)
    );
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        myReviews,
        addReview,
        playlist,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;