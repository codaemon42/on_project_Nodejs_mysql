const { DB } = require('../configuration');

class Model {

    /**
     * initialize the table for query
     */
    constructor(){
        this.tableName = 'tableName';
    }

    /**
     * find array on only one element
     * @param {*} id id of the table
     * @param {*} cb 
     */
    findOne(id, cb){
        const sql = `SELECT * FROM ${this.tableName} WHERE id=${DB.escVal(id)}`
        console.log(sql);
        DB.query(sql, (error, results, fields) =>{
            // const error = DB.errorParser(err);
            cb(error, results, fields)
        })
    }

    /**
     * get rows from the table
     * @param {*} data  json:{col*(str): value(any), ...}
     * @returns callback error | Array of rows
     */
    find(data, cb){
        let where = ``; // [ {col: , value, compare, operator} ]
        let orderBy = data.order_by ? data.order_by.toString() : `id`;
        let order = data.order ? data.order.toUpperCase().toString() : `DESC`;
        if( data.where ){
            where = ` WHERE`;
            for(let item of data.where){
                let likeSign = (item.compare === 'LIKE') ? '%' : '';
                if(item.compare === 'IN') {
                    where += `${item.operator} ${DB.escId(item.col)} ${item.compare} (${DB.escVal(item.value.toString())}) `;
                }
                else{
                    where += `${item.operator} ${DB.escId(item.col)} ${item.compare} '${likeSign}${DB.escVal(item.value)}${likeSign}' `;
                }
            }
        }
        //const sql = 
        let sqlTail = `${this.tableName}${where} ADD ORDER BY ${orderBy} ${order} LIMIT ${DB.escVal(data.page)}, ${DB.escVal(data.per_page)}`;
        const sql = `SELECT * FROM `+DB.sanitizeSQLTail(sqlTail);
        console.log(sql);
        DB.query( sql, (error, results, fields) =>{
            // const error = DB.errorParser(err);
            // console.log('error : ', error);
            
            cb(error, results, fields);
        })
    }


    /**
     * Insert One row in database
     * @param {*} data json[] : [{col: str, value: any}, ...]
     * @param {*} cb 
     */
    insertOne(data, cb){
        let cols = ``;
        let values = ``;
        for( const[col, value] of  Object.entries(data) ){
            cols += `${DB.escId(col)}, `;
            values += `${DB.escVal(value)}, `;
        }
        cols = cols.slice(0, -2);
        values = values.slice(0, -2);

        const sql = `INSERT INTO ${this.tableName} (${cols})
        VALUES (${values})
        `;
        console.log(sql);
        DB.query(sql, (error, results, fields) =>{
            // const error = DB.errorParser(err);
            console.log('error : ', error);
            console.log('results : ', results);
            cb(error, results, fields);
        })
    }


    /**
     * Delete one row by id
     * @param {*} id id of the row to delete
     * @param {*} cb 
     */
    deleteOne(id, cb){
        const sql = `DELETE FROM ${this.tableName} WHERE id=${DB.escVal(id)}`;
        console.log(sql);
        DB.query(sql, (error, results, fields) =>{
            // const error = DB.errorParser(err);
            // console.log('error : ', error);
            cb(error, results, fields);
        })
    }

    /**
     * Bulk delete rows
     * @param {*} idArray  Array of ids of the rows to delete
     * @param {*} cb 
     */
    deleteMany(idArray, cb){
        idArray.map(i=> DB.escVal(i) );
        const idArrayString = idArray.toString();
        const sql = `DELETE FROM ${this.tableName} WHERE id IN (${idArrayString})`;
        console.log(sql);
        DB.query(sql, (error, results, fields) =>{
            // const error = DB.errorParser(err);
            // console.log('error : ', error);
            cb(error, results, fields);
        })
    }


    /**
     * update one row in a table
     * @param {*} data json: { col: string, ..., id: any}
     * @param {*} cb 
     */
    updateOne(data, cb){
        let set = "";
        const where = `id=${DB.escVal(data.id)}`;
        delete data.id;
        for( const [col, value] of Object.entries(data) ) {
            set += `${DB.escId(col)}=${DB.escVal(value)}, `;
        }
        set = set.slice(0, -2);

        const sql = `UPDATE ${this.tableName} SET ${set} WHERE ${where} LIMIT 1`;
        console.log(sql);
        DB.query(sql, (error, results, fields) =>{
            // const error = DB.errorParser(err);
            // console.log('error : ', error);
            cb(error, results, fields);
        });
    }


    /**
     * update many row in a table
     * @param {*} data json: { col: string, ..., id: any[]}
     * @param {*} cb 
     */
    updateMany(data, cb){
        let set = "";
        console.log("data.id: ", data.id);
        data.id.map(i=> DB.escVal(i));
        const where = `id IN (${data.id.toString()})`;
        delete data.id;
        for( const [col, value] of Object.entries(data) ) {
            set += `${DB.escId(col)}=${DB.escVal(value)}, `;
        }
        set = set.slice(0, -2);

        const sql = `UPDATE ${this.tableName} SET ${set} WHERE ${where}`;
        console.log(sql);
        DB.query(sql, (error, results, fields) =>{
            // const error = DB.errorParser(err);
            // console.log('error : ', error);
            cb(error, results, fields);
        })
    }

    
    /**
     * check user has access or not
     * @param {*} id 
     * @returns 
     */
    // hasAccess(userId){
    //     return new Promise((resolve, reject)=>{
    //         try{
    //             const sql = `SELECT * FROM ${this.tableName} WHERE assigned_to=${userId}`;
    //             DB.query( sql, (err, results, fields) => {
    //                 resolve(results);
    //             })

    //         }catch(err){
    //             return reject(err);
    //         }
    //     })
    // }

}

module.exports = Model;