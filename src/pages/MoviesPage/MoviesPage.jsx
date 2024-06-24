// src/pages/MoviesPage/MoviesPage.jsx
import { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async () => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${query}`,
            {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWFiNDJhMWU2OTYwYjU3Nzk4Y2MyNzQ2MDc4NzBhZSIsIm5iZiI6MTcxOTIzMjYxMS41MTMyMTYsInN1YiI6IjY2Nzk1NTBlOTdkMDQ3YWNlNTNiM2Q4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4FcuTbWlX50OpF_1lUuNLgA4otbdKEcUFMYapbb3jNI',
                },
            }
        );
        setMovies(response.data.results);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Search Movies</h1>
            <div className={styles.searchBar}>
                <input type="text" value={query} onChange={handleInputChange} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <MovieList movies={movies} />
        </div>
    );
};

export default MoviesPage;
