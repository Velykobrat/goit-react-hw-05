import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
    const location = useLocation();
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

    return (
        <div>
            <ul className={styles.movieList}>
                {movies.map((movie) => (
                    <li key={movie.id} className={styles.movieItem}>
                        <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                            {movie.poster_path && (
                                <img
                                    src={`${imageBaseUrl}${movie.poster_path}`}
                                    alt={movie.title}
                                    className={styles.poster}
                                />
                            )}
                            <span className={styles.title}>{movie.title}</span>
                            <span className={styles.vote}>{movie.vote_average}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

MovieList.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            poster_path: PropTypes.string,
            vote_average: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default MovieList;
