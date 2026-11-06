// Get movies to display on the discover page
export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.status}`);
    }

    return response.json();
  });
};

// Get movies that come out soon from TMDB
export const getUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch upcoming movies: ${response.status}`);
      }

      return response.json();
    })
    .then((json) => json.results);
};

// Get popular movies from TMDB
export const getPopularMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch popular movies: ${response.status}`);
      }

      return response.json();
    })
    .then((json) => json.results);
};

// Get top rated movies from TMDB
export const getTopRatedMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch top-rated movies: ${response.status}`);
      }

      return response.json();
    })
    .then((json) => json.results);
};

// Get movies currently playing in cinemas
export const getNowPlayingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch now playing movies: ${response.status}`);
      }

      return response.json();
    })
    .then((json) => json.results);
};

// Get movie details using the movie id
export const getMovie = (args) => {
  const [, { id }] = args.queryKey;

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch movie: ${response.status}`);
    }

    return response.json();
  });
};

// Get movie genres from TMDB
export const getGenres = () => {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch genres: ${response.status}`);
    }

    return response.json();
  });
};

// Get posters for a movie
export const getMovieImages = ({ queryKey }) => {
  const [, { id }] = queryKey;

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch movie images: ${response.status}`);
    }

    return response.json();
  });
};

// Get cast and crew for a movie
export const getMovieCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch credits: ${response.status}`);
    }

    return response.json();
  });
};

// Get recommended movies using the movie id
export const getMovieRecommendations = ({ queryKey }) => {
  const [, { id }] = queryKey;

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch recommendations: ${response.status}`);
    }

    return response.json();
  });
};

// Get actor details using their id
export const getActorDetails = ({ queryKey }) => {
  const [, { id }] = queryKey;

  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch actor details: ${response.status}`);
    }

    return response.json();
  });
};

// Get movies an actor has appeared in
export const getActorMovieCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;

  return fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch actor movie credits: ${response.status}`);
    }

    return response.json();
  });
};

// Get audience reviews for a movie
export const getMovieReviews = ({ queryKey }) => {
  const [, { id }] = queryKey;

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch movie reviews: ${response.status}`);
    }

    return response.json();
  });
};