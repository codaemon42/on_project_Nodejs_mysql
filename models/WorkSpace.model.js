const Model = require('./model');

class WorkSpaceModel extends Model{

    constructor(){
        super();
        this.tableName = 'on_workspaces';
    }

}

module.exports = new WorkSpaceModel();