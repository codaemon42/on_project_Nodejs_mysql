const logger = require('../../configuration/logger');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5haW0iLCJpYXQiOjE2MjUzMjk3ODgsImV4cCI6MTYyNTQxNjE4OH0.Q0xr_yKgGysP0FR4dD9yvhYMEXeT8THXKBmBtt2XS6M
module.exports.postLogin = (req, res, next)=>{

     logger.stream;
    // res.send(`<h1>welcome to the login route</h1>`);
//sign in = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5haW0iLCJpYXQiOjE2MjUzOTM2MDUsImV4cCI6MTYyNTQ4MDAwNX0.RZdNAPiRQvDmwzzVs6sMiQd3xbXmfPAQpcOOv31itz4
//login = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuYWltIiwiaWF0IjoxNjI1Mzk4OTQ5LCJleHAiOjE2MjU0ODUzNDl9.cJs-kXiuW8ajq0ziMvIw67f69-dz3o_aAUX45hUfhrw
    User.login(req.body)
        .then( result => {
            console.log('result user :' , result);

            if( result instanceof Error){
                if(!result.code){
                    return next(result);
                }

                const error = new Error(result.code);
                error.statusCode = 500;
                return next(error);
            }

            //const roles = result.role
            const secret = readFileSync('./private.key');
            const token = jwt.sign({id: result.id, username: result.username, role: result.role}, secret, {expiresIn: '24h'});
            console.log(token);
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuYWltIiwiaWF0IjoxNjI1NTMzMjAzLCJleHAiOjE2MjU2MTk2MDN9.M8KTfM2mzNGfc2q8aa5xHLsii2Ifg80DGkUHlEpagSQ
            res.json({result,token});

        }).catch(err=>{
            console.log(err);
        })
}