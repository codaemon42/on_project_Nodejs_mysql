const { PrioritiesValidator } = require('../validator');
const { PrioritiesModel } = require('../models');
const createError = require('http-errors');

class PrioritiesController {
    constructor(){
        console.log('Controller initialized');
    }

    get(req, res, next){
        try{
            const data = JSON.parse(req.query.data);
            data.page = data.per_page * (data.page-1);
            const validation = PrioritiesValidator.getValidator(data);
            if( validation.error ) {
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }

            PrioritiesModel.find(data, (err, results, fields)=>{
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

    post (req, res, next) {
        try{
            // initialize
            const data = req.body;
            data.slug = data.name.replace(' ', '-').toLowerCase();
            data.created_by = req.user.id;
            console.log(data);
    
            // validate
            const validation = PrioritiesValidator.postValidator(data);
            if(validation.error) {
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }
    
            // query
            PrioritiesModel.insertOne(data, (error, results, fields)=>{
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

    updateCounter (req, res, next) {
        try{
            // initialize
            const data = req.body;
            // update the sql

            // validate
            const validation = PrioritiesValidator.countValidator(data);
            if(validation.error) {
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return next(error);
            }
            // process
            PrioritiesModel.updateCounter(data, (error, results, fields)=>{
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
     * edit the name of a priority
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    edit(req, res, next){
        // ini
        const data = req.body;
        // validate
        const validation = PrioritiesValidator.updateValidator(data);
        if(validation.error) {
            const error = new Error(validation.error.message);
            error.statusCode = 400;
            return next(error);
        }

        data.id = req.params.id;
        // query
        PrioritiesModel.updateOne(data, (error, results, fields)=>{
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
            const validation = PrioritiesValidator.updatePositionValidator(data);

            // query
            PrioritiesModel.updatePosition(data, (error, results, fields)=>{
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
     * Delete a priority
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    delete(req, res, next){
        try{
            const data = {
                id: req.params.id
            }
            const validation = PrioritiesValidator.deleteValidator(data);
            if( validation.error ) {
                const error = new Error(validation.error.message);
                error.statusCode = 500;
                return next(error);
            }
            PrioritiesModel.deleteOne(data.id, (err, results, fields)=>{
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

module.exports = new PrioritiesController();
