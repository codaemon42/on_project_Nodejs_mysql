const { Router } = require('express');
const SubTasksRouter = Router();
const { SubTasksController } = require('../controllers');

SubTasksRouter
.get('/', SubTasksController.get)
.post('/', SubTasksController.post)
.put('/edit/bulk', SubTasksController.updateMany)
.put('/edit/:id', SubTasksController.update)
.delete('/delete/bulk', SubTasksController.deleteMany)
.delete('/delete/:id', SubTasksController.delete)

module.exports = SubTasksRouter;