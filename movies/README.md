# React Movies App

A movie discovery application developed using React, Vite, Material UI and The Movie Database (TMDB) API.

This project was developed for the Web App Development 2 module at South East Technological University (SETU). It builds on the React Movies lab application with additional movie categories, actor information, navigation, filtering, sorting and personal movie collections.

## Features

### Movie Browsing

Users can browse several movie categories retrieved from TMDB:

- Discover Movies
- Upcoming Movies
- Popular Movies
- Top Rated Movies
- Now Playing Movies

Each movie is displayed as a card containing its poster, title, release year and rating. Selecting a movie opens its details page.

### Movie Details

The movie details page displays information such as the synopsis, release date, runtime, genres, rating and revenue.

Additional features include:

- Cast information with links to individual actor pages
- Recommended movies with links to their details pages
- Audience reviews retrieved from TMDB
- Alternative poster handling when an image is unavailable

### Actor Details

Actor pages display a profile image, biography, date of birth and place of birth when available.

Each page also includes a filmography showing up to ten recent credited films. Users can select these films to navigate back to their movie details.

### Searching, Filtering and Sorting

Movie lists support:

- Searching by movie title
- Filtering by genre
- Sorting by title in ascending or descending order
- Sorting by highest rating
- Sorting by newest release date

Search, filtering and sorting can be used together. A message is displayed when no movies match the selected options.

### Favourites and Playlist

Users can add movies to their favourites and create a personal playlist.

Movies can also be removed from these collections. Both features use React Context for state management and localStorage to preserve saved movies between browser sessions.

### Reviews

Users can access audience reviews from TMDB and write their own reviews for movies saved to their favourites.

Submitted reviews are stored locally using React Context and localStorage.

### User Interface

The application uses a customised Material UI theme with a dark colour scheme, responsive layouts, redesigned movie cards and updated navigation.

Loading indicators, error messages and fallback content are included where appropriate.

## Technologies Used

- React
- Vite
- JavaScript and JSX
- React Router
- TanStack React Query
- Material UI
- React Context
- React Hook Form
- TMDB API
- Browser localStorage

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Eve-Phillips-2005/react-movies-lab-2026.git
cd react-movies-lab-2026/movies
```

### 2. Install dependencies

Make sure Node.js and npm are installed, then run:

```bash
npm install
```

### 3. Configure the TMDB API key

Create a `.env` file inside the `movies` directory and add:

```env
VITE_TMDB_KEY=your_tmdb_api_key
```

Replace `your_tmdb_api_key` with your own TMDB API key.

An API key can be obtained from [The Movie Database](https://www.themoviedb.org/).

The `.env` file is excluded from Git using `.gitignore`. Because Vite exposes `VITE_` variables to browser code, this key should be treated as a client-side API key rather than a private server secret.

### 4. Run the application

```bash
npm run dev
```

Open the local URL displayed in the terminal.

## Other Commands

```bash
npm run lint
```

Checks the project using ESLint.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build locally after building.

## Project Structure

The main source files are organised into the following directories:

```text
movies/
├── src/
│   ├── api/          # TMDB API requests
│   ├── components/   # Reusable interface components
│   ├── contexts/     # Shared state and localStorage
│   ├── images/       # Local images and placeholders
│   ├── pages/        # Application pages
│   ├── App.jsx       # Routing and application providers
│   ├── main.jsx      # Application entry point
│   └── theme.js      # Material UI theme
├── package.json
└── README.md
```

## Data Fetching and State Management

TanStack React Query is used to retrieve and cache information from the TMDB API. Separate query keys are used for different movie categories, individual movies, credits, recommendations and actor information.

React Router handles navigation between pages, including parameterised routes for movie and actor details.

React Context manages favourites, playlists and user reviews. These are saved to localStorage so they remain available after refreshing or reopening the application in the same browser.

## Acknowledgements

This application was developed from the React Movies lab exercises provided as part of the Web App Development 2 module at SETU.

Movie information, posters, cast details and audience reviews are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).