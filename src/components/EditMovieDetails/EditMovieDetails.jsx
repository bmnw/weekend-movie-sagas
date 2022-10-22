import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import MenuButton from '../MenuButton/MenuButton.jsx';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Grid';
import { Typography } from '@mui/material';

const EditMovieDetails = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let {movieid} = useParams(); 

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
        dispatch({type: 'FETCH_MOVIE_REFRESH', payload: movieid});
    }, []);

     // code for dropdown  menu
     const [anchorEl, setAnchorEl] = useState(null);
     const open = Boolean(anchorEl);
 
     const handleClick = (event) => {
         setAnchorEl(event.currentTarget);
     }
 
     const handleClose = () => {
         setAnchorEl(null);
     }

     const allGenres = useSelector(store => store.genres);

     // new movie details variables
     const [genreID, setGenreID] = useState('');
     const [genre, setGenre] = useState('');
     const [movieTitle, setMovieTitle] = useState('');
     const [movieDescription, setMovieDescription] = useState('');
     const [posterLink, setPosterLink] = useState('');

     const movieDetails = useSelector(store => store.movieDetails);
     const movieGenres = useSelector(store => store.movieGenres);

     const toDetails = (inputID) => {
        console.log('in toDetails');
        history.push(`/details/${inputID}`); // action.payload the movie id
     }
 
     const handleSave = () => {
         console.log('in handleSave', movieid, movieTitle, posterLink, movieDescription, genreID);
         dispatch({type: 'PUT_MOVIE', payload: {id: movieid, title: movieTitle, poster: posterLink, description: movieDescription, genre_id: genreID}, toDetails: toDetails});
     } // end handleSave
 
     const selectGenre = (inputID, inputName) => {
         console.log('in selectGenre', inputID, inputName);
         setGenre(inputName);
         setGenreID(inputID);
     } // end selectGenre



    return  <> 
                <br />
                <Container sx={{display: 'flex', justifyContent: 'center'}}> 
                    {/* <MenuButton /> */}
                    </Container>
                    <Container sx={{display: 'flex', justifyContent: 'center'}}>
                        {movieDetails.map(detail => {
                            return  <Card key={detail.id} elevation={5} sx={{width: '50%', padding: 2, marginBottom: 2}}>
                                        <Typography variant="h5">Edit Details: current info shown below</Typography>
                                        <br />
                                        <Typography>{detail.title}</Typography>
                                        <TextField 
                                            sx={{margin: 2}} 
                                            required
                                            helperText="Update movie title"
                                            label="Required"
                                            // defaultValue={detail.title}
                                            variant="outlined" 
                                            type='text' 
                                            value={movieTitle}
                                            onChange={(event) => setMovieTitle(event.target.value)}
                                        />
                                        <Typography>{detail.description}</Typography>
                                        <TextField 
                                            sx={{margin: 2, minWidth: 500}} 
                                            required
                                            label="Required"
                                            helperText="Update movie description"
                                            variant="outlined" 
                                            multiline 
                                            minRows="4" 
                                            type='text' 
                                            value={movieDescription} 
                                            onChange={(event) => setMovieDescription(event.target.value)}
                                        />
                                        <br />
                                        <img src={detail.poster} alt={detail.title} width="100"/>
                                        
                                        <TextField 
                                            sx={{margin: 2, minWidth: 500}} 
                                            helperText="Update movie poster link. Max char: 120"
                                            variant="outlined" 
                                            required
                                            label="Required"
                                            type='text' 
                                            multiline 
                                            minRows="4"  
                                            value={posterLink} 
                                            onChange={(event) => setPosterLink(event.target.value)}
                                        />
                                        <br />
                                        <div>
                                            {movieGenres.map(genre => {
                                                return <Typography key={genre.id}>{genre.name}</Typography>
                                            })}
                                            <TextField 
                                                sx={{margin: 2}} 
                                                helperText="Select a movie genre from list" 
                                                required
                                                label="Required"
                                                variant="outlined" 
                                                type='text' 
                                                value={genre}
                                            />
                                            <Button
                                                variant="contained"
                                                onClick={handleClick}>List of Genres
                                            </Button>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                            >
                                                {allGenres.map(genre => {
                                                    return  <MenuItem key={genre.id} onClick={() => selectGenre(genre.id, genre.name)}>
                                                                {genre.name}
                                                            </MenuItem>
                                                    
                                                })}
                                            </Menu>
                                        </div>
                                        <Button sx={{marginRight: 1, width: 75}} variant="contained" onClick={(event) => history.goBack(`/details/${movieid}`)}>Cancel</Button>
                                        <Button sx={{marginLeft: 1, width: 75}} variant="contained" onClick={handleSave}>Save</Button>
                                    </Card>
                        })}
                       
                </Container>

            </>
}

export default EditMovieDetails;