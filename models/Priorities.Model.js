const Model = require('./model');
const { DB } = require('../configuration');

class PrioritiesModel extends Model{

    constructor(){
        super();
        this.tableName = 'on_Priorities';
    }

    updateCounter(data, cb){
        const sql = `UPDATE ${this.tableName} SET count=count+1 WHERE id=${DB.escVal(data.id)}`;
        DB.query(sql, (err, results, fields)=>{
            cb(err, results, fields);
        })
    }
}

module.exports = new PrioritiesModel();