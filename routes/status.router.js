const { Router } = require('express');
const statusRouter = Router();
const { StatusController } = require('../controllers');

statusRouter
.get('/', StatusController.get)
.post('/', StatusController.post)
.put('/edit/:id', StatusController.edit)
.put('/counter/:id', StatusController.updateCounter)
.put('/position', StatusController.positionChanger)
.delete('/delete/:id', StatusController.delete)

module.exports = statusRouter;