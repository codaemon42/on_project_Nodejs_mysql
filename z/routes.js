const { Router } = require('express');
const nameRouter = Router();
const { nameController } = require('../controllers');

nameRouter
.get('/', nameController.get)
.post('/', nameController.post)
.put('/edit/bulk', nameController.updateMany)
.put('/edit/:id', nameController.update)
.delete('/delete/bulk', nameController.deleteMany)
.delete('/delete/:id', nameController.delete)

module.exports = nameRouter;