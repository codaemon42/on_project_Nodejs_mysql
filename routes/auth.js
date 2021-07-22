
const { Router } = require('express');

const { postLogin, postSignUp, getVerified, Capability } = require('../controllers');

const router = Router();

router
.post('/login', postLogin)
.post('/signup', postSignUp)
.get('/verify', getVerified)
.post('/addcap', Capability.updateCapability)


module.exports = router;