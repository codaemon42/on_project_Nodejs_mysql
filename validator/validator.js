const joi = require('@hapi/joi');

class Validator {


    getValidator(data) {
        return joi.object({
            per_page: joi.number().required().integer(),
            page: joi.number().required().integer(),
            where: joi.array().items({
                operator: joi.string().allow("").required(),
                col: joi.string().required(),
                compare: joi.string().required(),
                value: joi.any().required()
            }),
            order_by: joi.string(),
            order: joi.string()
        }).validate(data);
    }


    deleteValidator(data){
        return joi.object({
            id: joi.string().required()
        }).validate(data);
    }

    
}

module.exports = Validator;