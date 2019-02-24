const middleware = require('./middleware');
const routes = require('./routes');
const service = require('./service');
const sockets = require('./sockets');

require('./sockets.js');

module.exports = {
    middleware,
    routes,
    service,
    sockets
};
