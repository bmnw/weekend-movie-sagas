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
        action.toDetails(action.payload); // moving user to selected movie Details after successful GET requests
    } catch (error) {
        console.log('error in fetchThisMovie', error);
        alert('Something went wrong getting movie details and genres.');
    }
} // end fetchThisMovie

function* refreshMovieDetails(action) {
    console.log('in refreshMovieDetails saga');
    try {
        const movieDetails = yield axios.get(`/api/movie/${action.payload}`); // payload is movie id
        console.log(movieDetails.poster);
        yield put({type: 'SET_MOVIE_DETAILS', payload: movieDetails.data}); // add reducer with this action type
        const movieGenres = yield axios.get(`/api/genre/${action.payload}`); // payload is movie id
        yield put({type: 'SET_MOVIE_GENRES', payload: movieGenres.data}); // add reducer with this action type
    } catch (error) {
        console.log('error in refreshMovieDetails', error);
        alert('Something went wrong getting movie details and genres.');
    }
} // end fetchThisMovie

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

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

// const newMovieGenreName = (state = '', action) => {
//     if (action.type === 'SET_NEW_MOVIE_GENRE') {
//         return action.payload;
//     }
//     return state;
// }

// const newMovieGenreID = (state = '', action) => {
//     if (action.type === 'SET_NEW_MOVIE_GENRE_ID') {
//         return action.payload;
//     }
//     return state;
// }

const selectedMovieID = (state = '', action) => {
    if (action.type === 'SET_MOVIE_ID'){
        return action.payload;
    }
    return state;
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails,
        movieGenres,
        selectedMovieID
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
