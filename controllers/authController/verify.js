const { dbCon, DB } = require('../../configuration');
const createError = require("http-errors");
const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');

const getVerified = (req, res, next) => {
    console.log(req.query);
    if(!req.query['token']){
        return next(createError(400));
    }
    const secret = readFileSync('./private.key');
    console.log(secret);
    const token = req.query['token'];
    console.log('token: ', token);
    try{
        const decoded = jwt.verify(token, secret);
        console.log(decoded['username']);
        const sql = `UPDATE on_users
            SET verified=true
            WHERE username='${decoded['username']}'`;
        DB.query(sql, (err, results, fields)=>{
            console.log("err : ", err);
            if(err) return next(createError(500));
            console.log(results);
            res.json({message: 'Your account has been successfully verified'})
        });
    }
    catch(err){
        return next(createError(409));
    }
}

module.exports = {
    getVerified
}