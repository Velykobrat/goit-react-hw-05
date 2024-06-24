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
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWFiNDJhMWU2OTYwYjU3Nzk4Y2MyNzQ2MDc4NzBhZSIsIm5iZiI6MTcxOTIzMjYxMS41MTMyMTYsInN1YiI6IjY2Nzk1NTBlOTdkMDQ3YWNlNTNiM2Q4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4FcuTbWlX50OpF_1lUuNLgA4otbdKEcUFMYapbb3jNI',
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
