const Joi = require('joi');

const routes = (handler) => [
    {
        method: 'POST',
        path: '/Login',
        options:{
            handler: handler.userAuthenticationLogin,
            notes: 'login authentication',
            tags: ['api'],
            validate:{
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required()
                })
            }
        }
    },
];

module.exports = routes;
