const { WorkSpaceModel } = require('../models');
const { workSpaceValidator } = require('../validator');
const createError = require('http-errors');
const { DB } = require('../configuration');
const Controller = require('./Controller');

class workspaceController extends Controller {

    constructor(){
        //super();
    }
    /**
     * find and fetch array of workspaces
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns error | json:{success: true, results: results(array)}
     */
    static getWorkSpace = (req, res, next) => {
        try{
            const data = JSON.parse(req.query.data);
            console.log('data : ', data);
            data.page = data.per_page * (data.page-1);
            const validation = workSpaceValidator.getValidator(data);
            if( validation.error ) {
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            WorkSpaceModel.find(data, (err, results, fields)=>{
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
     * workspace data insert controller
     * @param {*} req req.body: {title: str, description: str, }
     * @param {*} res 
     * @param {*} next 
     * @returns error | json:{success: true, results: results(array)}
     */
    static postWorkSpace = (req, res, next) => {
        try{
            const data = {
                title: req.body.title,
                description: req.body.description,
                created_by: req.user.id
            }
            const validation = workSpaceValidator.postValidator(data);
            if(validation.error){
                const err = new Error(validation.error.message);
                err.statusCode = 400;
                return next(err);
            }

            WorkSpaceModel.insertOne(data, (err, results, fields) =>{
                if(err instanceof Error){
                    console.log(err);
                    return next(err);
                }
                res.json({success: true, results: results});
            });
        }catch(err){
            console.log(err);
            return next(createError(500));
        }
    }

    /**
     * Delete a workspace
     * @param {*} req req.params{id: any}
     * @param {*} res 
     * @param {*} next 
     * @returns error | json:{success: true, results: results(array)}
     */
    static deleteWorkSpace = (req, res, next) => {
        try{
            const id = req.params.id;
            WorkSpaceModel.deleteOne(id, (err, results, fields) =>{
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
     * Delete bulk workspace by array of id
     * @param {*} req  req.body : {ids: array}
     * @param {*} res 
     * @param {*} next 
     * @returns error | json:{success: true, results: results(array)}
     */
        static deleteBulkWorkSpace = (req, res, next) => {
            try{
                const idArray = req.body.id;
                console.log('id array : ', idArray);
                WorkSpaceModel.deleteMany(idArray, (err, results, fields) =>{
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
     * returns only one workspace
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns error | json:{success: true, results: results(array)}
     */
    static findAWorkSpace = (req, res, next) => {
        try{
            WorkSpaceModel.findOne(req.params.id, (err, results, fields)=>{
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
     * 
     * @param {*} req  
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    static edit = (req, res, next) => {
        try{
            const validation = workSpaceValidator.updateValidator(req.body);
            if( validation.error){
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            const data = req.body;
            data.id = req.params.id;
            WorkSpaceModel.updateOne(data, (err, results, fields)=>{
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

    static editBulk = (req, res, next) => {
        try{
            const data = req.body;
            const validation = workSpaceValidator.updateBulkValidator(data);
            if( validation.error){
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            WorkSpaceModel.updateMany(data, (err, results, fields)=>{
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

module.exports = workspaceController;