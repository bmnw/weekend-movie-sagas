import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details.jsx';
import AddMovie from '../AddMovie/AddMovie.jsx';
import Header from '../Header/Header.jsx';

function App() {

  return (
    <div className="App">
      <Header />
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route exact path="/details">
          <Details />
        </Route>
        <Route exact path="/add-movie">
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}


export default App;
