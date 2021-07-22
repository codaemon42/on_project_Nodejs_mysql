const joi = require('@hapi/joi');
const validator = require('./validator');

class ProjectsValidator extends validator {


     postValidator(data) {
        return joi.object({
            workspace_id: joi.number().required(),
            title: joi.string().max(100).required(),
            description: joi.string().max(100).required(),
            created_by: joi.number().required(),
            assigned_to: joi.number().required(),
            files: joi.string(),
            status: joi.string().required(),
            priority: joi.string().required(),
            start_date: joi.date().required(),
            deadline_date: joi.date().required(),
            expected_date: joi.date().required()
        }).validate(data);
    }


    updateValidator(data) {
        return joi.object({
            id: joi.number().required(),
            workspace_id: joi.number(),
            title: joi.string(),
            description: joi.string(),
            assigned_to: joi.number(),
            files: joi.string(),
            status: joi.string(),
            priority: joi.string(),
            start_date: joi.date(),
            deadline_date: joi.date(),
            expected_date: joi.date()
        }).validate(data);
    }

    
    updateBulkValidator(data) {
        return joi.object({
            id: joi.number().required(),
            workspace_id: joi.number(),
            title: joi.string(),
            description: joi.string(),
            assigned_to: joi.number(),
            files: joi.string(),
            status: joi.string(),
            priority: joi.string(),
            start_date: joi.date(),
            deadline_date: joi.date(),
            expected_date: joi.date()
        }).validate(data);
    }

}

module.exports = new ProjectsValidator();