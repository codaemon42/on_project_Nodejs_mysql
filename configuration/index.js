const DB = require('./db');

module.exports = {
    logger: require('./logger'),
    DB: new DB(),
    email: require('./email'),
    Push: require('./push'),
    consoler: require('./consoler')
}