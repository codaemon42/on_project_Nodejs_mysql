const { auth, admin, workspace } = require('../middlewares');

const authRouter =  require('./auth');

const movieRouter = require('./movie');
const commentRouter = require('./comment');

const workspaceRouter = require('./workspace.router');
const ProjectsRouter = require('./Projects.Router');
const TasksRouter = require('./Tasks.Router');
const SubTasksRouter = require('./SubTasks.Router');
const IssuesRouter = require('./Issues.Router');

const UploadsRouter = require('./Uploads.Router');

const statusRouter = require('./status.router');
const PrioritiesRouter = require('./Priorities.router');




module.exports = (app) => {

    app.use('/auth', authRouter);

    app.use('/workspaces', auth, admin, workspaceRouter);
    app.use('/projects', auth, ProjectsRouter);
    app.use('/tasks', auth, TasksRouter);
    app.use('/subtasks', auth, SubTasksRouter);
    app.use('/issues', auth, IssuesRouter);

    app.use('/uploads', auth, UploadsRouter);

    app.use('/status', auth, admin, statusRouter);
    app.use('/priority', auth, admin, PrioritiesRouter);

    app.use('/movies', movieRouter);
    app.use('/comments', commentRouter);
    
    app.get('/', (req, res, next) => {
        res.send("<h1>welcome to the first route</h1>");
    });

    app.get('/:postId', (req, res, next) => {
        console.log(req.params);
        console.log(req.query);
        res.send(`<h1>welcome to the first route param ${req.params.postId}</h1>`);
    });

}