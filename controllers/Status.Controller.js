const { StatusValidator } = require('../validator');
const { StatusModel } = require('../models');
const createError = require('http-errors');

class StatusController {

    /**
     * 
     * @param {*} req schema: {per_page: int, page: int, where: [ {operator: str, col: str, compare: str, value: str}, ...], order_by: str, order: str}
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    get(req, res, next){
        try{
            const data = req.body;
            data.page = data.per_page * (data.page-1);
            const validation = StatusValidator.getValidator(data);
            if( validation.error ) {
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            StatusModel.find(data, (err, results, fields)=>{
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
     * 
     * @param {*} req schema: {type: string, name: string}
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    post (req, res, next) {
        try{
            // initialize
            const data = req.body;
            data.slug = data.name.replace(' ', '-').toLowerCase();
            data.type = data.type.toLowerCase();
            data.created_by = req.user.id;
            console.log(data);
    
            // validate
            const validation = StatusValidator.postValidator(data);
            if(validation.error) {
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }
    
            // query
            StatusModel.insertOne(data, (error, results, fields)=>{
                if(error instanceof Error){
                    console.log("error on ctrl : ", error);
                    return next(error);
                }

                // response
                res.json({success: true, results: results});
            })
        }catch(err){
            console.log(err);
            return next(createError(500));
        }
    }

    /**
     * 
     * @param {*} req schema: {slug: string, type: string}
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    updateCounter (req, res, next) {
        try{
            // initialize
            const data = req.body;
            // update the sql

            // validate
            const validation = StatusValidator.countValidator(data);
            if(validation.error) {
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }
            // process
            statusModel.updateCounter(data, (error, results, fields)=>{
                // response
                if(error instanceof Error){
                    console.log("error on ctrl : ", error);
                    return next(error);
                }

                res.json({success: true, results: results})
            });
        }catch(err){
            console.log(err);
            return next(createError(500));
        }
    }

    /**
     * 
     * @param {*} req [{id: int, position: int},...]
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    positionChanger(req, res, next){
        try{
            const data = req.body;
            console.log("data controller : ", data);

            //validate
            const validation = StatusValidator.updatePositionValidator(data);
            if(validation.error) {
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }
            // query
            StatusModel.updatePosition(data, (error, results, fields)=>{
                // response
                if(error instanceof Error){
                    console.log("error on ctrl : ", error);
                    return next(error);
                }

                res.json({success: true, results: results});
            })

        }catch(err){
            console.log(err);
            return next(createError(500));
        }
    }

    /**
     * Edit status name
     * @param {*} req  => status id | schema: {data: {id: int}}
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    edit(req, res, next){
        // ini
        const data = req.body;
        // validate
        const validation = StatusValidator.updateValidator(data);
        if(validation.error) {
            const error = new Error(validation.error.message);
            error.statusCode = 400;
            return next(error);
        }

        data.id = req.params.id;
        // query
        StatusModel.updateOne(data, (error, results, fields)=>{
            // response
            if(error instanceof Error){
                console.log("error on ctrl : ", error);
                return next(error);
            }

            res.json({success: true, results: results});
        })
    }
    
    
    /**
     * 
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
            const validation = StatusValidator.deleteValidator(data);
            if( validation.error ) {
                const error = new Error(validation.error.message);
                error.statusCode = 500;
                return next(error);
            }
            StatusModel.deleteOne(data.id, (err, results, fields)=>{
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

module.exports = new StatusController();