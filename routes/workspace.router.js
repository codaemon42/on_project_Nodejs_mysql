const { Router } = require('express');
const { workspaceController } = require('../controllers');

const router = Router();

router
// Get
.get('/', workspaceController.getWorkSpace)
.get('/:id', workspaceController.findAWorkSpace)
// POST
.post('/', workspaceController.postWorkSpace)
// Update
.put('/edit/bulk', workspaceController.editBulk)
.put('/edit/:id', workspaceController.edit)
// DELETE
.delete('/delete/bulk', workspaceController.deleteBulkWorkSpace)
.delete('/delete/:id', workspaceController.deleteWorkSpace)

module.exports = router;