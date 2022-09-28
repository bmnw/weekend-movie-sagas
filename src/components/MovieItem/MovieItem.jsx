import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

const MovieItem = ({movie}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const toDetails = () => {
        console.log('in toDetails');
        history.push('/details');
    } // end toDetails

    const handleClick = (inputId) => {
        console.log('in handleClick', inputId);
        dispatch({type: 'FETCH_THIS_MOVIE', payload: inputId, toDetails: toDetails});
    } // end handleClick

    return  <>
                <div>
                    <h3>{movie.title}</h3>
                    <img src={movie.poster} alt={movie.title} onClick={(event) => handleClick(movie.id)}/>
                </div>
            </>

} // end MovieItem

export default MovieItem;