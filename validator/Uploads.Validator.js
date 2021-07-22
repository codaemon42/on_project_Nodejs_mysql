const joi = require('@hapi/joi');
const Validator = require('./validator');

class UploadsValidator extends Validator{
    postValidator(data) {
        return joi.object({
            name: joi.string(),
            file: joi.any()
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

module.exports = new UploadsValidator();