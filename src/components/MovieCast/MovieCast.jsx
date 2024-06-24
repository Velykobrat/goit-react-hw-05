import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const fetchCast = async () => {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/credits`,
                {
                    headers: {
                        Authorization: 'Bearer YOUR_API_KEY',
                    },
                }
            );
            setCast(response.data.cast);
        };
        fetchCast();
    }, [movieId]);

    return (
        <div>
            <h2>Cast</h2>
            <ul>
                {cast.map(actor => (
                    <li key={actor.cast_id}>{actor.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default MovieCast;
