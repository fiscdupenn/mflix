import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
interface Movie {
    title: string;
    fullplot: string;
    released: Date;
    // Add more properties as needed
}


const MoviePage = ({  }) => {
    const [movieData, setMovieData] = useState<[Movie] | null>(null);
    const router = useRouter();
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`/api/movies/${router.query.movieId}`);
                const data = await response.json();
                setMovieData(data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
        if(router.query.movieId){
            fetchMovie();
        }
    }, [router.query.movieId]);

    if (!movieData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{movieData[0].title}</h1>
            <p>{movieData[0].fullplot}</p>
            <p>Release Year: {movieData[0].released}</p>
            {/* Add more JSX elements to display additional movie details */}
        </div>
    );
};

export default MoviePage;