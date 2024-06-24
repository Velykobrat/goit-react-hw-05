import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchMovieReviews = async () => {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWFiNDJhMWU2OTYwYjU3Nzk4Y2MyNzQ2MDc4NzBhZSIsIm5iZiI6MTcxOTI1MDQ2Ny44Mjg5MDMsInN1YiI6IjY2Nzk1NTBlOTdkMDQ3YWNlNTNiM2Q4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BMKFff-UWaolMsnA7O_sPhbMTX3tcZapOtXeytp1E8A',
                    },
                }
            );
            setReviews(response.data.results);
        };

        fetchMovieReviews();
    }, [movieId]);

    return (
        <div className={styles.reviewsContainer}>
            <h2>Reviews</h2>
            <ul className={styles.reviewsList}>
                {reviews.map((review) => (
                    <li key={review.id} className={styles.reviewItem}>
                        <h3>{review.author}</h3>
                        <p>{review.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieReviews;
