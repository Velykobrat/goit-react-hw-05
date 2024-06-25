import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const MoviesPage = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie`,
                    {
                        params: {
                            api_key: 'd5ab42a1e6960b57798cc274607870ae', 
                            query: query,
                        },
                    }
                );
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        if (query !== '') {
            fetchMovies();
        } else {
            setMovies([]);
        }
    }, [query]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        navigate(`/movies?query=${query}`);
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
