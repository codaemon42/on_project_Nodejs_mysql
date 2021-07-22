const morgan = require('morgan');

const { logger } = require('../configuration');

const express = require('express');

module.exports = {
    middleware: (app) => {
        app.use(morgan('combined', { stream: logger.stream }));
        app.use(express.json());
    },
    auth: require('./auth'), // role = user
    admin: require('./admin'), // role = 1
    workspace: require('./workstation-manager'), // role = 2
    project: require('./project-manager'), // role = 3
    task: require('./task-manager'), // role = 4
    user: require('./employ'), // role = 5
    uploads: require('./uploads') // uploader
}