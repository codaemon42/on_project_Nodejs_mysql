const { nameValidator } = require('../validator');
const { nameModel } = require('../models');
const createError = require('http-errors');

class nameController {
    constructor(){
        console.log('Controller created');
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
            const data = req.body;
            data.page = data.per_page * (data.page-1);

            const validation = nameValidator.getValidator(data);
            if( validation.error ) {
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            nameModel.find(data, (err, results, fields)=>{
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

            const validation = nameValidator.postValidator(data);
            if(validation.error){
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            nameModel.insertOne(data, (error, results, fields)=>{
                
                console.log("results : ", results);
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
            const validation = nameValidator.updateValidator(req.body);
            if( validation.error){
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            nameModel.updateOne(data, (err, results, fields)=>{
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

    updateMany = (req, res, next) => {
        try{
            const data = req.body;
            console.log(data);
            const validation = nameValidator.updateBulkValidator(data);
            if( validation.error){
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            nameModel.updateMany(data, (err, results, fields)=>{
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
            const validation = nameValidator.deleteValidator(data);
            if( validation.error ) {
                const error = new Error(validation.error.message);
                error.statusCode = 500;
                return next(error);
            }
            nameModel.deleteOne(data.id, (err, results, fields)=>{
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
     * Delete bulk tasks by array of id
     * @param {*} req  req.body : {ids: array}
     * @param {*} res 
     * @param {*} next 
     * @returns error | json:{success: true, results: results(array)}
     */
    deleteMany(req, res, next){
        try{
            const idArray = req.body.id;
            console.log('id array : ', idArray);
            nameModel.deleteMany(idArray, (err, results, fields) =>{
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

module.exports = new nameController();
