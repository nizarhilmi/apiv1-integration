const Joi = require('joi');

const routes = (handler) => [
    {
        method: 'POST',
        path: '/user',
        options: {
            handler: handler.registerNewUsers,
            notes: 'send payload to db',
            tags: ['api'],
            validate:{
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                    role: Joi.string().required(),
                })
            }
        },
    }
];

module.exports = routes;