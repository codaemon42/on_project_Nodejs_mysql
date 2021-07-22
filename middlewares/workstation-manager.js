const createError = require('http-errors');


module.exports = (req, res, next) => {
    if(!req.user.id){
        return next(createError(401));
    }
    try{
        const role = req.user.role;
        console.log("role : ", role);
        if(role <= 2) {
            next();
        }
        else{
            return next(createError(401));
        }
    }
    catch(err){
        next(createError(401));
    }
}