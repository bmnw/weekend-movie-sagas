import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Details = () => {

    const genres = useSelector(store => store.movieGenres);
    const movieDetails = useSelector(store => store.movieDetails);

    return  <> 
                
                
            </>
} // end Details

export default Details;