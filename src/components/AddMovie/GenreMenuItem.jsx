import MenuItem from '@mui/material/MenuItem';

const GenreMenuItem = ({genre}) => {

    const selectGenre = (inputID, inputName) => {
        console.log('in selectGenre', inputID, inputName);
    } // end selectGenre

    return  <>
                <MenuItem key={genre.id} onClick={selectGenre(genre.id, genre.name)}>
                    {genre.name}
                </MenuItem>
            </>
}

export default GenreMenuItem;