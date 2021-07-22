const joi = require('@hapi/joi');
const Validator = require('./validator');

class nameValidator extends Validator{
    postValidator(data) {
        return joi.object({
            title: joi.string().max(100).required(),
            created_by: joi.number().required()
        }).validate(data);
    }

    updateValidator(data) {
        return joi.object({
            title: joi.string(),
        }).validate(data);
    }
    updateBulkValidator(data) {
        return joi.object({
            title: joi.string(),
            id: joi.array().required(),
        }).validate(data);
    }
}

module.exports = new nameValidator();