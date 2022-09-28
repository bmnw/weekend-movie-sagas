import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

const Details = () => {

    const history = useHistory();
    const genres = useSelector(store => store.movieGenres);
    const movieDetails = useSelector(store => store.movieDetails);

    return  <div> 
                
                    {movieDetails.map(detail => {
                        return  <div key={detail.id}>
                                    <div>
                                        <img src={detail.poster} />     
                                    </div>
                                    <div>
                                        <h2>{detail.title}</h2>  
                                    </div>
                                    <div>
                                        <h4> {detail.description} </h4>    
                                    </div>  
                                </div>
                    })}
                
                <button onClick={(event) => history.goBack('/')}>To Movie List</button>

            </div>
} // end Details

export default Details;