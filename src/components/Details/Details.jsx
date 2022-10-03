import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import './Details.css';
import MenuButton from '../MenuButton/MenuButton.jsx';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { ConstructionOutlined } from '@mui/icons-material';

const Details = () => {

    let {movieid} = useParams(); 
    const history = useHistory();
    // const movieID = useSelector(store => store.selectedMovieID);
    const genres = useSelector(store => store.movieGenres);
    const movieDetails = useSelector(store => store.movieDetails);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIE_REFRESH', payload: movieid});
    }, []);

    const toMovieList = () => {
        console.log('in toMovieList');
        history.push('/');
    }

    const handleDelete = (inputID) => {
        console.log('in handleDelete', inputID);
        dispatch({type: 'DELETE_MOVIE', payload: inputID, toMovieList: toMovieList});
    } // end handleDelete

    return  <>
                <br />
                <MenuButton />
                <Paper className="movie-info" elevation={10}> 
                    {movieDetails.map(detail => {
                        return  <div style={{display: "flex", justifyContent: "space-between"}} key={detail.id}>
                                    <div>
                                        <img src={detail.poster} style={{width: 268, height: 395}} />     
                                    </div>
                                    <div style={{maxWidth: 300}}>
                                        <Typography variant="h2">{detail.title}</Typography>
                                            {genres.map(genre => {
                                                return  <Typography variant="h6" key={genre.id}>{genre.name}</Typography>
                                            })}
                                    </div>
                                    <div style={{width: 700}}>
                                        <Typography variant="h5" sx={{textAlign: 'justify'}}> {detail.description} </Typography>    
                                    </div>  
                                </div>
                    })}
                
                    <Button sx={{margin: 5}} variant='contained' onClick={(event) => history.push('/')}>To Movie List</Button>
                    <Button sx={{margin: 5}} color='secondary' variant='contained' onClick={(event) => history.push(`/edit/${movieid}`)}>Edit Movie Details</Button>
                    <Button sx={{margin: 5}} color='error' variant='contained' onClick={() => handleDelete(movieid)}>Delete Movie</Button>
                </Paper>
            </>
    
   
} // end Details

export default Details;