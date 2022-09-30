import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details.jsx';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function App() {
  return (
    <div className="App">
      <Paper elevation={5} sx={{padding: 2}}>
        <Typography variant="h2">🎬 Blockduster 🧹</Typography>
      </Paper>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route exact path="/details">
          <Details />
        </Route>

        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;
