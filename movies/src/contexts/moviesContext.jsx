import { useState, useEffect } from "react";
import { MoviesContext } from "./moviesContextDefinition.js";

const MoviesContextProvider = (props) => {
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

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("myReviews", JSON.stringify(myReviews));
  }, [myReviews]);

  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  const addToFavorites = (movie) => {
    setFavorites((current) =>
      current.includes(movie.id)
        ? current
        : [...current, movie.id]
    );
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  const addToPlaylist = (movie) => {
    setPlaylist((current) =>
      current.includes(movie.id)
        ? current
        : [...current, movie.id]
    );
  };

  const removeFromPlaylist = (movie) => {
    setPlaylist(playlist.filter((movieId) => movieId !== movie.id));
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        myReviews,
        addReview,
        addToPlaylist,
        removeFromPlaylist,
        playlist
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;