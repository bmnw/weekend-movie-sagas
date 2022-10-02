import {useHistory} from 'react-router-dom';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

const MenuButton = () => {

    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const toAddMovie = () => {
        console.log('in toAddMovie');
        history.push('/add-movie');
    } // end toAddMovie

    return  <>
             <div>
                <Button
                  onClick={handleClick}
                >
                  <MenuIcon />
                  Menu
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={(event) => history.push('/')}>Movie List</MenuItem>
                  <MenuItem onClick={toAddMovie}>Add Movie</MenuItem>
                </Menu>
              </div>
            </>
} // end MenuButton

export default MenuButton;