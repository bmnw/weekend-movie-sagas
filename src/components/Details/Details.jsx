import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import './Details.css';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Details = () => {

    const history = useHistory();
    const genres = useSelector(store => store.movieGenres);
    const movieDetails = useSelector(store => store.movieDetails);

    return  <Paper className="movie-info" elevation={10}> 
                
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
                                        <Typography variant="h5" sx={{textAlign: 'left'}}> {detail.description} </Typography>    
                                    </div>  
                                </div>
                    })}
                
                <Button sx={{margin: 5}} variant='contained' onClick={(event) => history.goBack('/')}>To Movie List</Button>

            </Paper>
} // end Details

export default Details;