import MenuItem from '@mui/material/MenuItem';

const GenreMenuItem = ({genre}) => {
    return  <>
                <MenuItem key={genre.id}>
                    {genre.name}
                </MenuItem>
            </>
}

export default GenreMenuItem;