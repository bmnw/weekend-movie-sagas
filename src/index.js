import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_THIS_MOVIE', fetchThisMovie);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
}

function* fetchAllGenres() {
    console.log('in fetchAllGenres saga');
    try{
        const genres = yield axios.get('/api/genre');
        yield put({type: 'SET_GENRES', payload: genres.data});
    } catch {
        console.log('ERROR in fetchAllGenres saga');
        alert('Something went wrong in fetchAllGenres saga');
    }
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function* fetchThisMovie(action) {
    console.log('in fetchThisMovie saga');
    try {
        const movieDetails = yield axios.get(`/api/movie/${action.payload}`); // payload is movie id
        yield put({type: 'SET_MOVIE_DETAILS', payload: movieDetails.data}); // add reducer with this action type
        const movieGenres = yield axios.get(`/api/genre/${action.payload}`); // payload is movie id
        yield put({type: 'SET_MOVIE_GENRES', payload: movieGenres.data}); // add reducer with this action type
        action.toDetails(); // moving user to selected movie Details after successful GET requests
    } catch (error) {
        console.log('error in fetchThisMovie', error);
        alert('Something went wrong getting movie details and genres.');
    }
} // end fetchThisMovie

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server

const movieDetails = (state = [], action) => {
    console.log('movieDetails reducer');
    if(action.type === 'SET_MOVIE_DETAILS'){
        return action.payload;
    }
    return state;
} // end movieDetails

const movieGenres = (state = [], action) => {
    console.log('movieGenres reducer');
    if(action.type === 'SET_MOVIE_GENRES'){
        return action.payload;
    }
    return state
} // end movieGenres

const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails,
        movieGenres
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
