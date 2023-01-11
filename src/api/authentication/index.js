const routes = require('./routes');
const AuthenticationHandler = require('./handler');

module.exports = {
    name: 'authentication',
    version: '1.0.0',
    register: async (server, {service, usersService, tokenManager}) => {
        const authenticationHandler = new AuthenticationHandler(service, usersService, tokenManager);
        server.route(routes(authenticationHandler));
    },
};
