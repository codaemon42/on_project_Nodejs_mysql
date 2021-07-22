const { User } = require('../../models');
const createError = require('http-errors');
const {email} = require('../../configuration');
const jwt = require('jsonwebtoken');
const {readFileSync} = require('fs');


module.exports.postSignUp = (req, res, next)=>{
    console.log("body : ", req.body);
    const validation = User.validator(req.body);
    if(validation.error) {
        const error = new Error(validation.error.message);
        error.statusCode = 404;
        console.log("validation error occurred");
        return next(error);
    }
    else{

        const user = new User(req.body);
        console.log("user : ", user);

        user.checkExistance()
        .then( exist => {
            if(exist.check) {
                const error = new Error(exist.message);
                error.statusCode = 404;
                console.log(error);
                console.log("existence error occurred");
                return next(error);
            }

            user.save((error) => {
                if(error){
                    return next(createError(500));
                }

                //verify email
                const secret = readFileSync('./private.key');
                const token = jwt.sign({username: user.userData['username']}, secret, {expiresIn: '24h'});

                    const from= 'mohazon.com.bd <info@mohazon.com.bd>';
                    const subject= 'Account Verification ';
                    const body = `
                            <p> Hello ${user.userData['username']} </p>
                
                            <p> verify your account </p>
                
                            <button> <a href="${process.env.APP_URL}${process.env.PORT}/auth/verify?token=${token}"> Click here </a> </button>
                
                        `;
                email(from, user.userData['email'], subject, body);

                res.status(201).json({
                    message: 'User has been successfully created',
                    user: user,
                });
            })

        })
        .catch( err => {
            next(createError(500));
        });
    }

}