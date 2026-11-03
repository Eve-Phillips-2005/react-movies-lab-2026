import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getActorDetails, getActorMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const ActorDetailsPage = () => {
    const { id } = useParams();

    const {
        data: actor,
        error,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["actor", { id: id }],
        queryFn: getActorDetails,
    });

    const {
        data: movieCredits,
        error: movieCreditsError,
        isPending: movieCreditsPending,
        isError: movieCreditsIsError,
    } = useQuery({
        queryKey: ["actorMovieCredits", { id: id }],
        queryFn: getActorMovieCredits,
    });

    if (isPending || movieCreditsPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    if (movieCreditsIsError) {
        return <h1>{movieCreditsError.message}</h1>;
    }

    return (
        <div>
            <Typography variant="h4">
                {actor.name}
            </Typography>

            <Avatar
                src={
                    actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : undefined
                }
                alt={actor.name}
                sx={{ width: 180, height: 180 }}
            />

            <Typography variant="body1">
                {actor.biography || "No biography available."}
            </Typography>

            <Typography variant="h5">
                Filmography
            </Typography>

            <Stack spacing={2}>
                {movieCredits.cast
                    .filter((movie) => movie.release_date)
                    .sort((a, b) => b.release_date.localeCompare(a.release_date))
                    .slice(0, 10)
                    .map((movie) => (
                        <Stack
                            key={movie.id}
                            direction="row"
                            spacing={2}
                            alignItems="center"
                        >
                            <Avatar
                                variant="rounded"
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                                        : undefined
                                }
                                alt={movie.title}
                                sx={{ width: 60, height: 90 }}
                            />

                            <Typography>
                                <Link to={`/movies/${movie.id}`}>
                                    {movie.title}
                                </Link>
                                {movie.character ? ` as ${movie.character}` : ""}
                            </Typography>
                        </Stack>
                    ))}
            </Stack>
        </div>
    );
};

export default ActorDetailsPage;