const Model = require('./model');

class SubTasksModel extends Model{

    constructor(){
        super();
        this.tableName = 'on_subtask';
    }

}

module.exports = new SubTasksModel();