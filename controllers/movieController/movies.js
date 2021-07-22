const { dbCon, email } = require('../../configuration');
const { ObjectId } = require('bson');
const createError = require('http-errors');



const getMovies = (req, res, next) => {

    dbCon('movies', async db => {

        try {

            const movie = await db.findOne();
            //test
            const info = {
                username: 'Naim',
                token: '32fd43w43bt454g5'
            }
            console.log('from movieC: ', info);
            const subject= `Hello ${info['username']}`;
            const body = `<p>Hello ${info['username']}</p> <p> this is you token ${info['token']}</p>`;

            email('naimhassanjcc2542@gmail.com', subject, body);
            res.json(movie);
    
        }
        catch (err) {

            next(createError(500));
            
        }

    })

}



const getMoviesByPage = (req, res, next) => {

    const pageNum = parseInt(req.params.page);

    if( isNaN(pageNum) ){

        next(createError(400));

    }

    const moviesToSkip = (pageNum - 1) * 10;

    dbCon('movies', async db => {

        try {

            const movies = await db.find({}).skip(moviesToSkip).limit(10).toArray();

            res.json(movies);

        }
        catch (err) {

            next(createError(500));

        }

    })

}



const getOneMovie = (req, res, next) => {

    if(!ObjectId.isValid(req.params.id)){

        next(createError(400));

    }

    const _id = new ObjectId(req.params.id);

    dbCon('movies', async db => {

        try {

            const oneMovie = await db.findOne({_id});

            if(!oneMovie){
    
                next(createError(404));
    
            }
    
            res.json(oneMovie);

        }
        catch (err) {
            next(createError(500));
        }

    })

}



module.exports = {
    getMovies,
    getMoviesByPage,
    getOneMovie
}