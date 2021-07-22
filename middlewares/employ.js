const createError = require('http-errors');


module.exports = (req, res, next) => {
    if(!req.user.id){
        return next(createError(401));
    }
    try{
        const role = req.user.role;
        if(role <= 5) {
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