// src/pages/HomePage/HomePage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            const response = await axios.get(
                'https://api.themoviedb.org/3/trending/movie/day',
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWFiNDJhMWU2OTYwYjU3Nzk4Y2MyNzQ2MDc4NzBhZSIsIm5iZiI6MTcxOTIzMjYxMS41MTMyMTYsInN1YiI6IjY2Nzk1NTBlOTdkMDQ3YWNlNTNiM2Q4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4FcuTbWlX50OpF_1lUuNLgA4otbdKEcUFMYapbb3jNI',
                    },
                }
            );
            setMovies(response.data.results);
        };
        fetchTrendingMovies();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Trending Movies</h1>
            <MovieList movies={movies} />
        </div>
    );
};

export default HomePage;
