const { ObjectID } = require('bson');
const createError = require('http-errors');
const { consoler } = require('../configuration');
const { Comment } = require('../models');

class CommentController {

    static postComment = (req,res,next) => {
        console.log(req.param);
        console.log('req.body : ', req.body['text']);
        console.log('req.user : ', req.user);

        //movieId validate
        if(!ObjectID.isValid(req.params.movieId)){
            consoler('movieId', req.params.movieId);
            return next(createError(400));
        }

        //text validate
        const error = Comment.validator(req.body['text']);
        if(error){
            return next(error);
        };

        const commentData = {text: req.body['text']};
        commentData.userId = new ObjectID(req.user['_id']);
        commentData.username = req.user.username;
        commentData.movieId =  new ObjectID(req.params.movieId);

        consoler('commentData', commentData);

        const commentIns = new Comment(commentData);

        //save
        commentIns.save()
        .then(()=>{
            res.status(201).json({message: 'comment created successfully', commentData: commentData});
        })
        .catch(err=>{
            return next(createError(500));
        })

    }


    
    static editComment = (req, res, next) => {
        res.send('comment edited');
    }

    static deleteComment = (req, res, next) => {
        res.send('comment deleted');
    }
}

module.exports = CommentController;
