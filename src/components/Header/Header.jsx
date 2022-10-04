import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const Header = () => {

    return  <Paper elevation={5} sx={{padding: 2}}>
                <Typography variant="h2">🎬 Blockduster 🧹</Typography>
                <Typography variant="h5">movies to clean your house to</Typography>
                <Typography variant="h5">or not</Typography>
            </Paper>
}

export default Header;