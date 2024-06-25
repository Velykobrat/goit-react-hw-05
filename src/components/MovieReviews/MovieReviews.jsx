import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (!movieId) return;

        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
                    {
                        params: {
                            api_key: 'd5ab42a1e6960b57798cc274607870ae'
                        }
                    }
                );
                setReviews(response.data.results);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [movieId]);

    return (
        <div className={styles.reviewsList}>
            <Link to={location?.state?.from ?? '/movies'} className={styles.goBack}>
                Go back
            </Link>
            {reviews.map(review => (
                <div key={review.id} className={styles.review}>
                    <h3 className={styles.author}>Author: {review.author}</h3>
                    <p className={styles.content}>{review.content}</p>
                </div>
            ))}
        </div>
    );
};

export default MovieReviews;
