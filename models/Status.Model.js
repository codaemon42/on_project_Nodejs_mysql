const Model = require("./model");
const { DB } = require('../configuration');

class StatusModel extends Model {
    constructor(){
        super();
        this.tableName = 'on_statuses';
    }

    updateCounter(data, cb){
        const sql = `UPDATE ${this.tableName} SET count=count+1 WHERE id=${DB.escVal(data.id)}`;
        DB.query(sql, (err, results, fields)=>{
            cb(err, results, fields);
        })
    }

    updatePosition( body, cb ) {
        const data = body.data;
        let cases = ``;
        let ids = ``;
        data.map(item=>{
            cases += `WHEN id = ${DB.escVal(item.id)} THEN ${DB.escVal(item.position)} `;
            ids += `${DB.escVal(item.id)}, `;
        });
        ids = ids.slice(0, -2);
        const sql = `UPDATE ${this.tableName}
        SET position = 
            CASE 
            ${cases}
            END
        
        WHERE id IN (${ids})`;
        console.log(sql);
        DB.query(sql, (err, results, fields)=>{
            cb(err, results, fields);
        });
    }

}

module.exports = new StatusModel();