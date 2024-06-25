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
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}`,
                    {
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWFiNDJhMWU2OTYwYjU3Nzk4Y2MyNzQ2MDc4NzBhZSIsIm5iZiI6MTcxOTIzMjYxMS41MTMyMTYsInN1YiI6IjY2Nzk1NTBlOTdkMDQ3YWNlNTNiM2Q4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4FcuTbWlX50OpF_1lUuNLgA4otbdKEcUFMYapbb3jNI',
                        },
                    }
                );
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    const handleGoBack = () => {
        navigate(location?.state?.from ?? '/movies');
    };

    const posterUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'URL_TO_PLACEHOLDER_IMAGE';

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
                <Link to="cast" className={styles.additionalLink} state={{ from: location }}>Cast</Link>
                <Link to="reviews" className={styles.additionalLink} state={{ from: location }}>Reviews</Link>
            </div>
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;
