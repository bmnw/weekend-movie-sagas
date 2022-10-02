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

    return  <> 
                <MenuButton />
                <Card>
                    <TextField sx={{margin: 2}} label="Movie Title" variant="outlined" type='text'/>
                    <TextField sx={{margin: 2}} label="Movie Description" variant="outlined" multiline type='text'/>
                    <TextField sx={{margin: 2}} label="Movie Poster Link" variant="outlined" type='text'/>
                    <TextField sx={{margin: 2}} label="Select a movie genre" variant="outlined" type='text'/>
                    <div>
                        <Button
                            onClick={handleClick}
                        >
                            Movie Genres
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            {allGenres.map(genre => {
                                return  <MenuItem>
                                            {genre.name}
                                        </MenuItem>
                            })}
                        </Menu>
              </div>
                </Card>
            </>
} // end AddMovie

export default AddMovie;