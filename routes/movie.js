const { Router } = require('express');
const { getMovies, getMoviesByPage, getOneMovie } = require('../controllers');
const {auth} = require('../middlewares');
 
const router = Router();

router
.get('/', auth, getMovies)
.get('/page/:page', getMoviesByPage)
.get('/id/:id', getOneMovie);

module.exports = router;