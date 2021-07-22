const { Router } = require('express');
const TasksRouter = Router();
const { TasksController } = require('../controllers');

TasksRouter
.get('/', TasksController.get)
.post('/', TasksController.post)
.put('/edit/bulk', TasksController.updateMany)
.put('/edit/:id', TasksController.update)
.delete('/delete/bulk', TasksController.deleteMany)
.delete('/delete/:id', TasksController.delete)

module.exports = TasksRouter;