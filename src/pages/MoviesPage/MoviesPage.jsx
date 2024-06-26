import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const queryParam = searchParams.get('query') || '';

    useEffect(() => {
        setQuery(queryParam);

        if (queryParam) {
            const fetchMovies = async () => {
                try {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/search/movie`,
                        {
                            params: {
                                api_key: 'd5ab42a1e6960b57798cc274607870ae', 
                                query: queryParam,
                            },
                        }
                    );
                    setMovies(response.data.results);
                } catch (error) {
                    console.error('Error fetching movies:', error);
                }
            };
            fetchMovies();
        } else {
            setMovies([]);
        }
    }, [queryParam]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ query: query });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Search Movies</h1>
            <form className={styles.searchBar} onSubmit={handleSearch}>
                <input 
                    type="text" 
                    value={query} 
                    onChange={handleInputChange} 
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Search</button>
            </form>
            <MovieList movies={movies} />
        </div>
    );
};

export default MoviesPage;
