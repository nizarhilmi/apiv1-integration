const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package.json');
require('dotenv').config();

// user register
const UsersService = require('./service/UsersService');
const user = require('./api/users')

// authentication register
const AuthenticationService = require('./service/AuthenticationService');
const authentication = require('./api/authentication');
const TokenManager = require('./token/TokenGenerator');

const init = async () => {

    const usersService = new UsersService();
    const authenticationService = new AuthenticationService();
    const server = Hapi.server({
        port:process.env.PORT,
        host:process.env.HOST,
        routes:{
            cors:{
                origin:['*'],
            },
        },
    });


    const swaggerOptions = {
        info: {
            title: 'API Documentation',
            version: Pack.version,
        },
        schemes: ['http','https'],
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);


    await server.register([
        {
            plugin: user,
            options:{
                service: usersService
            },
        },
        {
            plugin: authentication,
            options:{
                usersService,
                service: authenticationService,
                tokenManager: TokenManager
            },
        },
    ]);

    await server.start();
    console.log(`server running on ${server.info.uri}/documentation`);
}

init();
