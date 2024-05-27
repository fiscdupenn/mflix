import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true)
            try {
                const response = await fetch('/api/movies');
                const data = await response.json();
                setMovies(data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false)
            }
        };

        fetchMovies();
    }, []);

    return (
        <Fragment>
            {loading ? <div>Movie List Loading...</div>:
            <div>
                <h1 className='movielist-title'>Movies List</h1>
                <ul>
                    {movies.map((movie: { _id: string, title: string }) => (
                        <li key={movie._id}>
                            <Link href={`/movies/${movie._id}`}>
                                {movie.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            }
        </Fragment>
    );
};

export default MoviesList;