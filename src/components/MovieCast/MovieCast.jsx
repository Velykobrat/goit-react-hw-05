import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieCast.module.css';

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const fetchMovieCast = async () => {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/credits`,
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWFiNDJhMWU2OTYwYjU3Nzk4Y2MyNzQ2MDc4NzBhZSIsIm5iZiI6MTcxOTI1MDQ2Ny44Mjg5MDMsInN1YiI6IjY2Nzk1NTBlOTdkMDQ3YWNlNTNiM2Q4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BMKFff-UWaolMsnA7O_sPhbMTX3tcZapOtXeytp1E8A',
                    },
                }
            );
            setCast(response.data.cast);
        };

        fetchMovieCast();
    }, [movieId]);

    return (
        <div className={styles.castContainer}>
            <h2>Cast</h2>
            <ul className={styles.castList}>
                {cast.map((member) => (
                    <li key={member.cast_id} className={styles.castItem}>
                        {member.name} as {member.character}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieCast;
