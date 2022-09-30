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

    const toDetails = () => {
        console.log('in toDetails');
        history.push('/details');
    } // end toDetails

    const handleClick = (inputId) => {
        console.log('in handleClick', inputId);
        dispatch({type: 'FETCH_THIS_MOVIE', payload: inputId, toDetails: toDetails});
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