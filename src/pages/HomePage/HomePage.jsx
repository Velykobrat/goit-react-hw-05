import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            const response = await axios.get(
                'https://api.themoviedb.org/3/trending/movie/day',
                {
                    headers: {
                        Authorization: 'Bearer YOUR_API_KEY',
                    },
                }
            );
            setMovies(response.data.results);
        };
        fetchTrendingMovies();
    }, []);

    return (
        <div>
            <h1>Trending Movies</h1>
            <MovieList movies={movies} />
        </div>
    );
};

export default HomePage;
