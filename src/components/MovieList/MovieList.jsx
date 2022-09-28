import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieItem from '../MovieItem/MovieItem.jsx'

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const [movieId, setMovieId] = useState('')

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const handleClick = (inputID) => {
        console.log('in handleClick', inputID);
    } // end handleClick

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        
                            <MovieItem 
                                movie={movie}
                            />
                       
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;