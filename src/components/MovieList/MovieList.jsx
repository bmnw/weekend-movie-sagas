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
            <section className="movies">
                <Grid container spacing={2}>
                    {movies.map(movie => {
                        return (
                            <Grid item xs={6} md={4} lg={3} key={movie.id}>
                                <MovieItem 
                                    movie={movie}
                                    
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