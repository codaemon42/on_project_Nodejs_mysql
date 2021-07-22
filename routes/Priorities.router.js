const { Router } = require('express');
const PrioritiesRouter = Router();
const { PrioritiesController } = require('../controllers');

PrioritiesRouter
.get('/', PrioritiesController.get)
.post('/', PrioritiesController.post)

module.exports = PrioritiesRouter;