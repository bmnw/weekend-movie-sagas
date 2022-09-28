import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MovieItem = ({movie}) => {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    const handleClick = (inputId) => {
        console.log('in handleClick', inputId);
        dispatch({type: 'FETCH_THIS_MOVIE', payload: inputId});
    } // end handleClick

    return  <>
                <div key={movie.id} >
                    <h3>{movie.title}</h3>
                    <img src={movie.poster} alt={movie.title} onClick={(event) => handleClick(movie.id)}/>
                </div>
            </>

} // end MovieItem

export default MovieItem;