require('dotenv').config();
const mysql = require('mysql');

class DB {
    constructor(){
        this.pool = mysql.createPool({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            connectionLimit: 100
        });
        this.db = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });
        this.connect();
    }

    connect() {
        this.db.connect((err, result) => {
            if(err) throw err;
        
            console.log('connected');
        });
    }


    getQuery(sql, cb){
        this.db.query(sql, (err, results, fields)=>{
            const error = this.errorParser(err);
            console.log('error : ', error);
            cb(error, results, fields);
        })
    }

    errorHandler(err){
        if(err){
            if(err.code){
                const error = new Error(err.code);
                error.statusCode = 500;
                return next(error);
            }

            return next(createError(500));
        }
        else{
            return false;
        }
    }

    static errorParser(err){
        if(err){
            if(err.code){
                const error = new Error(err.code);
                error.statusCode = 500;
                return error;
            }

            return createError(500);
        }
        else{
            return false;
        }
    }

    /**
     * Escape an untrusted string to be used as a SQL value. Use this on user provided data.
     * @param {*} value 
     */
    escVal(value){
        return this.db.escape(value);
    }

    /**
     * Escape an untrusted string to be used as a SQL identifier (database, table, or column name). Use this on user provided data.
     * @param {*} value 
     */
    escId(value){
        return this.db.escapeId(value);
    }

    /**
     * format sql before executing for escape injection
     * @param {*} sql 
     * @param {*} inserts 
     * @returns 
     */
    format(sql, inserts){
        return mysql.format(sql, inserts)
    }

    /**
     * sanitize full sql statement from 'Drop', 'Delete', 'Update', 'Create', 'Insert', 'Add' & 'Select' injection
     * @param {*} sql 
     * @returns 
     */
    sanitizeSQLTail(sql){
        const disalloweds = [ 'Drop', 'Delete', 'Update', 'Create', 'Insert', 'Add', 'Select' ];
        let trimmed = sql;
        for(let disallowed of disalloweds ) {
            trimmed = trimmed.split(disallowed).join('');
        
            trimmed = trimmed.split(disallowed.toUpperCase()).join('');
        
            trimmed = trimmed.split(disallowed.toLowerCase()).join('');
        }
        return trimmed;
    }

    query(sql, callback){
        this.pool.getConnection(function(conError, connection){
            console.log("got pool : ", connection.threadId);
            if (conError) {
              callback(conError, results, fields);
              return;
            }
            connection.query(sql, function(err, results, fields){
                //console.log('error : ', err);
                
                connection.release();
                const error = DB.errorParser(err);
                callback(error, results, fields);
                // check null for results here
            });
            connection.on('error', function(err) {
                console.log("on Error");
                  callback(err, results, fields);
                  return;
            });
        });
    };

}

module.exports = DB;


// const _uri = process.env.MONGODB_URI;

// const dbCon = (coll, cb) => {

//     MongoClient.connect(_uri, {useUnifiedTopology: true})

//     .then( async client => {

//         const db = client.db('sample_mflix').collection(coll);

//         await cb(db);

//         client.close();

//     })

// };

// // dbCon('movies', async db => {
// //     const movie = await db.findOne();
// //     console.log(movie);
// // })

// module.exports = dbCon;


// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'on_project'
// });

// db.connect((err, result) => {
//     if(err) throw err;

//     console.log('connected');
// });

// db.query("SELECT * FROM on_workspaces", (err, results, fields)=>{
//     if(err) throw err;

//     console.log("res: ", results[0].title);
//     //console.log("fields: ", fields);
// });
// getModel = {
//     table: 'table_name',
//     select: '*',
//     query: [
//         {
//             name: 'INNER JOIN',
//             values: {
//                 table: 'table2',
//                 col: 'id',
//                 value: 'table2.order_id',
//                 compare: '='
//             }

//         },
//         {
//             name: 'where',
//             values: [
//                 {
//                     table: 'table_name',
//                     col: 'id',
//                     value: '1' || ['1', '2'],
//                     compare: '=' || 'IN'
//                 }
//             ]
//         },

//     ],
//     limit: 10,
//     offset: 0

// }



