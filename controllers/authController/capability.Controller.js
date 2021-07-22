const { User } = require('../../models');


class Capability{

    static updateCapability = (req, res, next) =>{
        const data = {
            username: req.body.username ? req.body.username : '',
            email: req.body.email ? req.body.email : '',
            newRole: req.body.newRole,
            newSubordinates: req.body.newSubordinates
        }
        const result = User.addCapability(data);

        if(result instanceof Error){
            console.log(result);
            return next(result);
        }

        res.json({message: 'user updated successfully'})
    }
}

module.exports = Capability