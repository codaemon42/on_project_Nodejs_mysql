const { ProjectsValidator } = require('../validator');
const { ProjectsModel } = require('../models');
const createError = require('http-errors');

class ProjectsController {
    constructor(){
        console.log('ProjectsController created');
    }

    /**
     * get projects 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    get(req, res, next){
        try{
            const data = JSON.parse(req.query.data);
            
            console.log("data : ", data);
            data.page = data.per_page * (data.page-1);

            const validation = ProjectsValidator.getValidator(data);
            if( validation.error ) {
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            ProjectsModel.find(data, (err, results, fields)=>{
                if(err instanceof Error){
                    console.log(err);
                    return next(err);
                }
                res.json({success: true, result: results});
            })

        }catch(err){
            return next(createError(500));
        }
    }

    /**
     * insert one project in DB
     * @param {*} req ProjectsValidator.postValidator(schema)
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    post(req, res, next){
        try{
            const data = req.body;
            data.created_by = req.user.id;

            const validation = ProjectsValidator.postValidator(data);
            if(validation.error){
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            ProjectsModel.insertOne(data, (error, results, fields)=>{
                if(error instanceof Error){
                    console.log(error);
                    return next(error);
                }

                res.json({success: true, results: results});
            });
        }catch(err){
            console.log(err);
            return next(createError(500));
        }
    }

    /**
     * update any projects column
     * @param {*} req ProjectsValidator.updateValidator(schema)
     * @param {*} res 
     * @param {*} next 
     * @returns json: {message: string} | {success: true, results: any|any[]}
     */
    update(req, res, next){
        try{
            const data = req.body;
            data.id = req.params.id;

            console.log("data: ", data);
            const validation = ProjectsValidator.updateValidator(req.body);
            if( validation.error){
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            ProjectsModel.updateOne(data, (err, results, fields)=>{
                if(err instanceof Error){
                    console.log(err);
                    return next(err);
                }
                res.json({success: true, results: results});
            })
        }catch(err){
            console.log(err);
            return next(createError(500));
        }
    }

    /**
     * delete a project by id
     * @param {*} req => status id | json: {data: {id: int}}
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
     delete(req, res, next){
        try{
            const data = {
                id: req.params.id
            }
            const validation = ProjectsValidator.deleteValidator(data);
            if( validation.error ) {
                const error = new Error(validation.error.message);
                error.statusCode = 500;
                return next(error);
            }
            ProjectsModel.deleteOne(data.id, (err, results, fields)=>{
                if(err instanceof Error){
                    console.log(err);
                    return next(err);
                }
                res.json({success: true, results: results});
            })
        }catch(err){
            console.log(err);
            return next(createError(500));
        }
    }
}

module.exports = new ProjectsController();
