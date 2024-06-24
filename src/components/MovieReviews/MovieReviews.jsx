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
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWFiNDJhMWU2OTYwYjU3Nzk4Y2MyNzQ2MDc4NzBhZSIsIm5iZiI6MTcxOTIzMjYxMS41MTMyMTYsInN1YiI6IjY2Nzk1NTBlOTdkMDQ3YWNlNTNiM2Q4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4FcuTbWlX50OpF_1lUuNLgA4otbdKEcUFMYapbb3jNI',
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
