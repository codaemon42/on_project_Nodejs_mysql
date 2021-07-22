const { Router } = require('express');
const IssuesRouter = Router();
const { IssuesController } = require('../controllers');

IssuesRouter
.get('/', IssuesController.get)
.post('/', IssuesController.post)
.put('/edit/bulk', IssuesController.updateMany)
.put('/edit/:id', IssuesController.update)
.delete('/delete/bulk', IssuesController.deleteMany)
.delete('/delete/:id', IssuesController.delete)

module.exports = IssuesRouter;