import { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (!movieId) return;

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

    const posterUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : defaultImg;

    return (
        <div className={styles.container}>
            <Link to={location?.state?.from ?? '/movies'} className={styles.goBack}>
                Go back
            </Link>
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
                <Link to="cast" className={styles.additionalLink} state={{ from: location.state?.from ?? '/movies' }}>Cast</Link>
                <Link to="reviews" className={styles.additionalLink} state={{ from: location.state?.from ?? '/movies' }}>Reviews</Link>
            </div>
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;
