const Model = require('./model');

class IssuesModel extends Model{

    constructor(){
        super();
        this.tableName = 'on_Issues';
    }

}

module.exports = new IssuesModel();