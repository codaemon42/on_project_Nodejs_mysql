const joi = require('@hapi/joi');
const Validator = require('./validator');

class SubTasksValidator extends Validator{


    postValidator(data) {
        return joi.object({
            task_id: joi.number().required(),
            title: joi.string().max(100).required(),
            description: joi.string().max(100).required(),
            created_by: joi.number().required(),
            assigned_to: joi.string().required(),
            files: joi.string(),
            status: joi.string().required(),
            priority: joi.string().required(),
            start_date: joi.date().required(),
            end_date: joi.date().required()
        }).validate(data);
    }


    updateValidator(data) {
        return joi.object({
            id: joi.number().required(),
            task_id: joi.number(),
            title: joi.string(),
            description: joi.string(),
            assigned_to: joi.string(),
            files: joi.string(),
            status: joi.string(),
            priority: joi.string(),
            start_date: joi.date(),
            end_date: joi.date()
        }).validate(data);
    }

    updateBulkValidator(data) {
        return joi.object({
            id: joi.array().required(),
            task_id: joi.number(),
            title: joi.string(),
            description: joi.string(),
            assigned_to: joi.string(),
            files: joi.string(),
            status: joi.string(),
            priority: joi.string(),
            start_date: joi.date(),
            end_date: joi.date()
        }).validate(data);
    }
    
}

module.exports = new SubTasksValidator();