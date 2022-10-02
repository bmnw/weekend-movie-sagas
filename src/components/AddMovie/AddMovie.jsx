import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import MenuButton from '../MenuButton/MenuButton.jsx';
import GenreMenuItem from './GenreMenuItem.jsx';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const AddMovie = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
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

    const handleSave = () => {
        console.log('in handleSave', movieTitle, posterLink, movieDescription, genreID);
        dispatch({type: 'POST_MOVIE', payload: {title: movieTitle, poster: posterLink, description: movieDescription, genre_id: genreID}, toMovieList: toMovieList});
    } // end handleSave

    const selectGenre = (inputID, inputName) => {
        console.log('in selectGenre', inputID, inputName);
        setGenre(inputName);
        setGenreID(inputID);
    } // end selectGenre

    const toMovieList = () => {
        console.log('in toMovieList');
        history.push('/');
    } // end toDetails

    return  <div> 
                <MenuButton />
                <Card elevation={5}>
                    <TextField sx={{margin: 2}} label="Movie Title" variant="outlined" type='text' value={movieTitle} onChange={(event) => setMovieTitle(event.target.value)}/>
                    <TextField sx={{margin: 2}} label="Movie Description" variant="outlined" multiline minRows="4" type='text' value={movieDescription} onChange={(event) => setMovieDescription(event.target.value)}/>
                    <TextField sx={{margin: 2}} label="Movie Poster Link" variant="outlined" type='text' multiline minRows="4"  value={posterLink} onChange={(event) => setPosterLink(event.target.value)}/>
                    {/* <TextField sx={{margin: 2}} label="Select a movie genre from list" variant="outlined" type='text' value={selectedGenre}/> */}
                    <div>
                        <TextField sx={{margin: 2}} label="Select a movie genre from list" variant="outlined" type='text' value={genre}/>
                        <Button
                            onClick={handleClick}
                        >
                            List of Genres
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
                    <Button onClick={(event) => history.goBack('/')}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </Card>
            </div>
} // end AddMovie

export default AddMovie;