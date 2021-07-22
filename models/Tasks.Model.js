const Model = require('./model');

class TasksModel extends Model{

    constructor(){
        super();
        this.tableName = 'on_tasks';
    }

}

module.exports = new TasksModel();