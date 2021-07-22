const joi = require('@hapi/joi');
const Validator = require('./validator');

class PrioritiesValidator extends Validator{
    
    postValidator(data) {
        return joi.object({
            name: joi.string().required(),
            slug: joi.string().required(),
            type: joi.string().valid("workspaces", "projects", "tasks", "meetings", "issues", "supports"),
            created_by: joi.number().required()
        }).validate(data);
    }

    
    updateValidator(data) {
        return joi.object({
            name: joi.string(),
            type: joi.string(),
        }).validate(data);
    }


    countValidator(data) {
        return joi.object({
            slug: joi.number().required(),
            type: joi.string().required()
        }).validate(data);
    }
    
    updatePositionValidator(data){
        return joi.object({
            data: joi.array().items({
                id: joi.number().required(),
                position: joi.number().required()
            }).required()
        }).validate(data);
    }

}

module.exports = new PrioritiesValidator();