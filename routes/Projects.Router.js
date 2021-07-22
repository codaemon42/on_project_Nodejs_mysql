const { Router } = require('express');
const ProjectsRouter = Router();
const { ProjectsController } = require('../controllers');

ProjectsRouter
.get('/', ProjectsController.get)
.post('/', ProjectsController.post)
.put('/edit/:id', ProjectsController.update)
.delete('/delete/:id', ProjectsController.delete)

module.exports = ProjectsRouter;