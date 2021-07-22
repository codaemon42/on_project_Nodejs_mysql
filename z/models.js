const Model = require('./model');

class nameModel extends Model{

    constructor(){
        super();
        this.tableName = 'on_name';
    }

}

module.exports = new nameModel();