const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  
  res.sendStatus(500)
});

router.get('/:id', (req, res) => {
  console.log('in genre GET /:id');
  const movieID = req.params.id;
  const queryText =   `SELECT "genres"."name" FROM "genres"
                      JOIN "movies_genres" ON "genres"."id" = "movies_genres"."genre_id"
                      JOIN "movies" ON "movies_genres"."movie_id" = "movies"."id"
                      WHERE "movies"."id" = $1;`
  pool.query(queryText, [movieID])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('ERROR GET genres by movie id', error);
      res.sendStatus(500);
    });
});

module.exports = router;