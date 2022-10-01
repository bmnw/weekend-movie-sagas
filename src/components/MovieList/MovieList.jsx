import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import MenuButton from '../MenuButton/MenuButton.jsx';
import './MovieList.css';
import MovieItem from '../MovieItem/MovieItem.jsx';
import Grid from '@mui/material/Grid';


function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const toAddMovie = () => {
        console.log('in toAddMovie');
        history.push('/add-movie');
    } // end toAddMovie

    return (
        <main>
            <section className="movies">
                <MenuButton />
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