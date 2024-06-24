// src/pages/MovieDetailsPage/MovieDetailsPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}`,
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWFiNDJhMWU2OTYwYjU3Nzk4Y2MyNzQ2MDc4NzBhZSIsIm5iZiI6MTcxOTIzMjYxMS41MTMyMTYsInN1YiI6IjY2Nzk1NTBlOTdkMDQ3YWNlNTNiM2Q4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4FcuTbWlX50OpF_1lUuNLgA4otbdKEcUFMYapbb3jNI',
                    },
                }
            );
            setMovie(response.data);
        };

        fetchMovieDetails();
    }, [movieId]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    const handleGoBack = () => {
        navigate(location?.state?.from ?? '/movies');
    };

    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <div className={styles.container}>
            <button className={styles.goBack} onClick={handleGoBack}>Go back</button>
            <div className={styles.movieDetails}>
                <img src={posterUrl} alt={movie.title} className={styles.poster} />
                <div className={styles.info}>
                    <h1 className={styles.title}>{movie.title}</h1>
                    <p className={styles.subtitle}>Overview</p>
                    <p className={styles.text}>{movie.overview}</p>
                    <p className={styles.subtitle}>Genres</p>
                    <p className={styles.text}>
                        {movie.genres.map((genre) => genre.name).join(', ')}
                    </p>
                </div>
            </div>
            <div className={styles.additionalInfo}>
                <h2 className={styles.subtitle}>Additional Information</h2>
                <Link to="cast" className={styles.additionalLink}>Cast</Link>
                <Link to="reviews" className={styles.additionalLink}>Reviews</Link>
            </div>
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;
