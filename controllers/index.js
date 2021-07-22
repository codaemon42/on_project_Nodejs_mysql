
const { postLogin } = require('./authController/login');
const { postSignUp } = require('./authController/signup');
const { getVerified } = require('./authController/verify');
const { getMovies, getMoviesByPage, getOneMovie } = require('./movieController/movies');
const CommentController = require('./commentController');
const workspaceController = require('./workspace.Controller');
const StatusController = require('./Status.Controller');
const Capability = require('./authController/capability.Controller');

module.exports = {
    ProjectsController: require('./Projects.Controller'),
    TasksController: require('./Tasks.Controller'),
    SubTasksController: require('./SubTasks.Controller'),
    IssuesController: require('./Issues.Controller'),
    UploadsController: require('./Uploads.Controller'),
    PrioritiesController: require('./Priorities.Controller'),
    PrioritiesController: require('./Priorities.Controller'),
    postLogin,
    postSignUp,
    Capability,
    getMovies,
    getVerified,
    getMoviesByPage,
    getOneMovie,
    CommentController,
    workspaceController,
    StatusController

}



;
