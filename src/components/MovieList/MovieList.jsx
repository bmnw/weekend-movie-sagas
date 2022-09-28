import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import MovieItem from '../MovieItem/MovieItem.jsx';
import Grid from '@mui/material/Grid';



function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                <Grid container spacing={2}>
                    {movies.map(movie => {
                        return (
                            <Grid item xs={3}>
                                <MovieItem 
                                    movie={movie}
                                    key={movie.id}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
              
            </section>
        </main>

    );
}

export default MovieList;