import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuButton from '../MenuButton/MenuButton.jsx';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const AddMovie = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    const allGenres = useSelector(store => store.genres);

    const [selectedGenre, setSelectedGenre] = useState('');
    const [movieTitle, setMovieTitle] = useState('');
    const [movieDescription, setMovieDescription] = useState('');
    const [posterLink, setPosterLink] = useState('');

    return  <div> 
                <MenuButton />
                <Card elevation={5}>
                    <TextField sx={{margin: 2}} label="Movie Title" variant="outlined" type='text' onChange={setMovieTitle}/>
                    <TextField sx={{margin: 2}} label="Movie Description" variant="outlined" multiline minRows="4" type='text' onChange={setMovieDescription}/>
                    <TextField sx={{margin: 2}} label="Movie Poster Link" variant="outlined" type='text' onChange={setPosterLink}/>
                    {/* <TextField sx={{margin: 2}} label="Select a movie genre from list" variant="outlined" type='text' value={selectedGenre}/> */}
                    <div>
                        <TextField sx={{margin: 2}} label="Select a movie genre from list" variant="outlined" type='text' value={selectedGenre}/>
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
                                return  <MenuItem key={genre.id} onClick={(event) => setSelectedGenre(genre.name)}>
                                            {genre.name}
                                        </MenuItem>
                            })}
                        </Menu>
                    </div>
                    <Button>Cancel</Button>
                    <Button>Save</Button>
                </Card>
            </div>
} // end AddMovie

export default AddMovie;