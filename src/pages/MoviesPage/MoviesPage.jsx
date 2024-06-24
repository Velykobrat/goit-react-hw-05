import { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

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
                    Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDMxZmIzMDBmYjVmYWRlMmM3Yzc2OWNjZjUxYzZmMiIsInN1YiI6IjYxZTY3MmI4OTA0ZjZkMDA2NmU0MDAzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4VWIw9pXoVOQfnLkDjx99Gpf4XTtjt_8VrmWzUCoC7w',
                },
            }
        );
        setMovies(response.data.results);
    };

    return (
        <div>
            <h1>Search Movies</h1>
            <input type="text" value={query} onChange={handleInputChange} />
            <button onClick={handleSearch}>Search</button>
            <MovieList movies={movies} />
        </div>
    );
};

export default MoviesPage;
