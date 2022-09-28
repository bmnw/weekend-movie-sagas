import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Details = () => {

    const genres = useSelector(store => store.movieGenres);
    const movieDetails = useSelector(store => store.movieDetails);

    return  <div> 
                
                    {movieDetails.map(detail => {
                        return  <div key={detail.id}>
                                    {detail.title}
                                    <br />
                                    {detail.description}       
                                    <br />
                                    <img src={detail.poster} />                
                                </div>
                    })}
                
                
            </div>
} // end Details

export default Details;