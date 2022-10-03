import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import './MovieItem.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const MovieItem = ({movie}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    // let movieID;

    const toDetails = (inputId) => {
        console.log('in toDetails', inputId);
        history.push(`/details/${inputId}`);
    } // end toDetails

    const handleClick = (inputId) => {
        console.log('in handleClick', inputId);
        // movieID = inputId;
        dispatch({type: 'FETCH_THIS_MOVIE', payload: inputId, toDetails: toDetails});
        dispatch({type: 'SET_MOVIE_ID', payload: inputId});
    } // end handleClick

    return  <>
                <Card elevation={10} onClick={(event) => handleClick(movie.id)}>
                    <CardActionArea sx={{bgcolor: 'lightgray'}}>
                        <CardMedia 
                            component="img"
                            image={movie.poster}
                            alt={movie.title}
                            height="400"
                        />
                        <CardContent>
                            <Typography>{movie.title}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </>

} // end MovieItem

export default MovieItem;