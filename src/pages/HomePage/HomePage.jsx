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
                        Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDMxZmIzMDBmYjVmYWRlMmM3Yzc2OWNjZjUxYzZmMiIsInN1YiI6IjYxZTY3MmI4OTA0ZjZkMDA2NmU0MDAzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4VWIw9pXoVOQfnLkDjx99Gpf4XTtjt_8VrmWzUCoC7w',
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
