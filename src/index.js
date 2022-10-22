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
    yield takeEvery('POST_MOVIE', postMovie);
    yield takeEvery('FETCH_MOVIE_REFRESH', refreshMovieDetails);
    yield takeEvery('PUT_MOVIE', putMovie);
    yield takeEvery('DELETE_MOVIE', deleteMovie);
}

// SAGAS
// delete selected movie and return user to movie list
function* deleteMovie (action) {
    console.log('in deleteMovie saga', action.payload);
    try{
        yield axios.delete(`/api/movie/${action.payload}`);
        action.toMovieList();
    } catch (error) {
        console.log('error in deleteMovie saga', error);
        alert('Something went wrong deleting the movie.');
    }
}

// update the details of a selected movie and return user to details page if successfully updated
function* putMovie(action) {
    console.log('in putMovie saga');
    console.log('action.payload.id', action.payload.id);
    try{
        yield axios.put(`/api/movie/${action.payload.id}`, action.payload);
        action.toDetails(action.payload.id);
    } catch (error) {
        console.log('error in putMovie saga', error);
        alert('Something went wrong updating the movie details. Likely the poster link has too many characters.');
    }
}

// add new movie to the movie list
function* postMovie (action) {
    console.log('in postMovie sasga');
    try {
        yield axios.post('/api/movie', action.payload);
        yield put ({type: 'FETCH_MOVIES'});
        action.toMovieList();
    } catch (error) {
        console.log('error in postMovie saga', error);
        alert('Something went wrong. Likely there are too many characters in the poster link.');
    }
} // end postMovie saga

// get all of the genres in the database and set the genres reducer
function* fetchAllGenres() {
    console.log('in fetchAllGenres saga');
    try{
        const genres = yield axios.get('/api/genre');
        yield put({type: 'SET_GENRES', payload: genres.data});
    } catch (error) {
        console.log('ERROR in fetchAllGenres saga', error);
        alert('Something went wrong in fetchAllGenres saga');
    }
}

// get all of the movies and related details from the database, set the movie details reducer
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

// get the details of the selected movie, then get the genres associated with that movie, then take user to details page
function* fetchThisMovie(action) {
    console.log('in fetchThisMovie saga');
    try {
        const movieDetails = yield axios.get(`/api/movie/${action.payload}`); // payload is movie id
        yield put({type: 'SET_MOVIE_DETAILS', payload: movieDetails.data}); // add reducer with this action type
        const movieGenres = yield axios.get(`/api/genre/${action.payload}`); // payload is movie id
        yield put({type: 'SET_MOVIE_GENRES', payload: movieGenres.data}); // add reducer with this action type
        action.toDetails(action.payload); // moving user to selected movie Details after successful GET requests
    } catch (error) {
        console.log('error in fetchThisMovie', error);
        alert('Something went wrong getting movie details and genres.');
    }
} // end fetchThisMovie

// get movie details and genres of selected movie when the page is refreshed
function* refreshMovieDetails(action) {
    console.log('in refreshMovieDetails saga');
    try {
        const movieDetails = yield axios.get(`/api/movie/${action.payload}`); // payload is movie id
        yield put({type: 'SET_MOVIE_DETAILS', payload: movieDetails.data}); // add reducer with this action type
        const movieGenres = yield axios.get(`/api/genre/${action.payload}`); // payload is movie id
        yield put({type: 'SET_MOVIE_GENRES', payload: movieGenres.data}); // add reducer with this action type
    } catch (error) {
        console.log('error in refreshMovieDetails', error);
        alert('Something went wrong getting movie details and genres.');
    }
} // end refreshMovieDetails

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// REDUCERS
// selected movie details
const movieDetails = (state = [], action) => {
    console.log('movieDetails reducer');
    if(action.type === 'SET_MOVIE_DETAILS'){
        return action.payload;
    }
    return state;
} // end movieDetails

 // selected movie genre(s)
const movieGenres = (state = [], action) => {
    console.log('movieGenres reducer');
    if(action.type === 'SET_MOVIE_GENRES'){
        return action.payload;
    }
    return state
} // end movieGenres

// set movie list 
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// set list of movie genres for AddMovie dropdown list
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
