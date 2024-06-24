import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, Route, Routes, useLocation } from 'react-router-dom';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    const location = useLocation();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}`,
                {
                    headers: {
                        Authorization: 'Bearer YOUR_API_KEY',
                    },
                }
            );
            setMovie(response.data);
        };
        fetchMovieDetails();
    }, [movieId]);

    const backLink = location.state?.from ?? '/movies';

    return (
        <div>
            <Link to={backLink}>Go back</Link>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p>{movie.overview}</p>
            <nav>
                <Link to="cast">Cast</Link>
                <Link to="reviews">Reviews</Link>
            </nav>

            <Routes>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
            </Routes>
        </div>
    );
};

export default MovieDetailsPage;
