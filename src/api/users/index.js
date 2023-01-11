const routes = require('./routes');
const UserHandler = require('./handler');

module.exports = {
    name: 'user',
    version: '1.0.0',
    register: async(server, {service}) => {
        const userHandler = new UserHandler(service);
        server.route(routes(userHandler));
    },
};