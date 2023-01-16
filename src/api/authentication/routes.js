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
    {
        method: 'POST',
        path: '/RefreshToken',
        options: {
            handler: handler.regenerateAccessToken,
            notes: 'regenerate access token',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    refreshToken: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/RefreshToken',
        options: {
            handler: handler.deleteAuthenticationUser,
            notes: 'delete access token',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    refreshToken: Joi.string().required()
                })
            }
        }
    }
];

module.exports = routes;
