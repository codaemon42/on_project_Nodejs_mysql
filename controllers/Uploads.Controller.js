const { UploadsValidator } = require('../validator');
const { UploadsModel } = require('../models');
const { uploads } = require('../middlewares');
const createError = require('http-errors');

class UploadsController {
    constructor(){
        console.log('UploadsController Controller created');
    }

    upload = async (req, res, next) => {
        try {
            //await uploads(req, res);

            // if (req.file == undefined) {
            //     return next(createError(400));
            // }

            res.status(200).json({
                success: true,
                results: "Uploaded the file successfully: ",
            });

        } catch (err) {
            console.log("catch : ", err);
            return next(createError(500));
        }
    };

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

            const validation = UploadsValidator.getValidator(data);
            if( validation.error ) {
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            UploadsModel.find(data, (err, results, fields)=>{
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

            const validation = UploadsValidator.postValidator(data);
            if(validation.error){
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            UploadsModel.insertOne(data, (error, results, fields)=>{
                
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
            const validation = UploadsValidator.updateValidator(req.body);
            if( validation.error){
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            UploadsModel.updateOne(data, (err, results, fields)=>{
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
            const validation = UploadsValidator.updateBulkValidator(data);
            if( validation.error){
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            UploadsModel.updateMany(data, (err, results, fields)=>{
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
            const validation = UploadsValidator.deleteValidator(data);
            if( validation.error ) {
                const error = new Error(validation.error.message);
                error.statusCode = 500;
                return next(error);
            }
            UploadsModel.deleteOne(data.id, (err, results, fields)=>{
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
            UploadsModel.deleteMany(idArray, (err, results, fields) =>{
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

module.exports = new UploadsController();
