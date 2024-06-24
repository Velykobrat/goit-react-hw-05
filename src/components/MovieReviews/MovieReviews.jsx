import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
                {
                    headers: {
                        Authorization: 'Bearer YOUR_API_KEY',
                    },
                }
            );
            setReviews(response.data.results);
        };
        fetchReviews();
    }, [movieId]);

    return (
        <div>
            <h2>Reviews</h2>
            <ul>
                {reviews.map(review => (
                    <li key={review.id}>
                        <p>{review.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieReviews;
