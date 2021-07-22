const joi = require('@hapi/joi');
const Validator = require('./validator');

class WorkSpaceValidator extends Validator {
    
    
    postValidator(data) {
        return joi.object({
            title: joi.string().max(100).required(),
            description: joi.string(),
            created_by: joi.number().required()
        }).validate(data);
    }

    updateValidator(data) {
        return joi.object({
            title: joi.string(),
            description: joi.string(),
        }).validate(data);
    }
    updateBulkValidator(data) {
        return joi.object({
            title: joi.string(),
            description: joi.string(),
            id: joi.array().required(),
        }).validate(data);
    }

}

module.exports = new WorkSpaceValidator();