const { Router } = require('express');
const UploadsRouter = Router();
const { UploadsController } = require('../controllers');
const { uploads } = require('../middlewares');

UploadsRouter
.get('/', UploadsController.get)
// .post('/', UploadsController.post)
.post('/', uploads, UploadsController.upload)
.put('/edit/bulk', UploadsController.updateMany)
.put('/edit/:id', UploadsController.update)
.delete('/delete/bulk', UploadsController.deleteMany)
.delete('/delete/:id', UploadsController.delete)

module.exports = UploadsRouter;