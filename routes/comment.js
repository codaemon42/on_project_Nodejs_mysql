const {Router} = require('express');

const router = Router();

const { auth } = require('../middlewares');
const {CommentController} = require('../controllers');

router
.post('/createComment/:movieId', auth, CommentController.postComment);

module.exports = router;