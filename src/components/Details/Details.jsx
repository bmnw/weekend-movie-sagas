import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import './Details.css';

const Details = () => {

    const history = useHistory();
    const genres = useSelector(store => store.movieGenres);
    const movieDetails = useSelector(store => store.movieDetails);

    return  <div className="movie-info"> 
                
                    {movieDetails.map(detail => {
                        return  <div style={{display: "flex", justifyContent: "space-between"}} key={detail.id}>
                                    <div>
                                        <img src={detail.poster} />     
                                    </div>
                                    <div>
                                        <h2>{detail.title}</h2>
                                            {genres.map(genre => {
                                                return  <h4 key={genre.id}>{genre.name}</h4>
                                            })}
                                    </div>
                                    <div style={{width: 700}}>
                                        <h4> {detail.description} </h4>    
                                    </div>  
                                </div>
                    })}
                
                <button onClick={(event) => history.goBack('/')}>To Movie List</button>

            </div>
} // end Details

export default Details;