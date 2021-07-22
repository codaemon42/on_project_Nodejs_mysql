const Model = require('./model');

class UploadsModel extends Model{

    constructor(){
        super();
        this.tableName = 'on_uploads';
    }

}

module.exports = new UploadsModel();