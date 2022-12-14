const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET all movies from database
router.get('/', (req, res) => {
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

// PUT to update a movie already in the database
router.put('/:id', (req, res) => {
  console.log('in movie PUT /:id', req.params.id);
  const queryText = `UPDATE "movies" SET 
                    "title" = $2, 
                    "poster" = $3,
                    "description" = $4
                    WHERE "movies"."id" = $1;`
  pool.query(queryText, [req.params.id, req.body.title, req.body.poster, req.body.description])
    .then(result => {
        const genreQueryText =    `UPDATE "movies_genres"
                                  SET "genre_id" = $2
                                  WHERE "movie_id" = $1;`
        pool.query(genreQueryText, [req.params.id, req.body.genre_id])
          .then(result => {
            res.sendStatus(200);
          })
          .catch(error => {
            console.log('error in movie PUT /:id genre query', error);
            res.sendStatus(500);
          });
    })
    .catch(error => {
      console.log('error in movie PUT /:id movie details query', error);
      res.sendStatus(500);
    });
});

// GET a selected movie
router.get('/:id', (req, res) => {
  console.log('in movie GET /:id');
  const movieID = req.params.id;
  const queryText = `SELECT * FROM "movies"
                    WHERE "movies"."id" = $1;`
  pool.query(queryText, [movieID])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('ERROR GET movie details by movie id', error);
      res.sendStatus(500);
    });
});

// POST to add a new movie to the database
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
});

// DELETE to remove the selected movie from both "movies" and "movies_genres"
router.delete('/:id', (req, res) => {
  console.log('in movie DELETE /:id', req.params.id);
  const moviesGenresText = `DELETE FROM "movies_genres" 
                            WHERE "movie_id" = $1;`
  pool.query(moviesGenresText, [req.params.id])
    .then(result => {
      const moviesText = `DELETE FROM "movies" 
                          WHERE "id" = $1;`
      pool.query(moviesText, [req.params.id])
        .then(result => {
          res.sendStatus(200);
        })
        .catch(error => {
          console.log('error in movie DELETE /:id moviesText', error);
          res.sendStatus(500);
        })
    })
    .catch(error => {
      console.log('error in movie DELETE /:id moviesGenresText', error);
      res.sendStatus(500);
    });
});

module.exports = router;