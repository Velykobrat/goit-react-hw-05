import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieCast.module.css';

const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (!movieId) return;

        const fetchCast = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
                    {
                        params: {
                            api_key: 'd5ab42a1e6960b57798cc274607870ae',
                        },
                    }
                );
                setCast(response.data.cast);
            } catch (error) {
                console.error('Error fetching cast:', error);
            }
        };

        fetchCast();
    }, [movieId]);

    return (
        <div className={styles.castList}>
            <Link to={location.state?.from ?? '/movies'} className={styles.goBack}>
                Go back
            </Link>
            {cast.map((member) => (
                <div key={member.cast_id} className={styles.castMember}>
                    <img
                        src={
                            member.profile_path
                                ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                                : defaultImg
                        }
                        alt={member.name}
                        className={styles.profileImg}
                    />
                    <p className={styles.name}>{member.name}</p>
                </div>
            ))}
        </div>
    );
};

export default MovieCast;
