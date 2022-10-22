import {useHistory} from 'react-router-dom';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

const MenuButton = () => {

    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null); // used to position the menu
    const open = Boolean(anchorEl); // true or false
    // const [showMenu, setShowMenu] = useState(false); // using this instead of anchorEl loses element positioning
    // const open = showMenu;

    const handleClick = (event) => {
        console.log(event.currentTarget);
        console.log(Boolean(event.currentTarget)); // true
        setAnchorEl(event.currentTarget); // sets anchorEl to true, which triggers the menu to open
    }

    const handleClose = () => {
        setAnchorEl(null); // sets anchorEl to false, which closes the menu
    }

    const toAddMovie = () => {
        console.log('in toAddMovie');
        history.push('/add-movie');
    } // end toAddMovie

    return  <>
             <div>
                <Button
                  onClick={handleClick}
                  variant="contained"
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