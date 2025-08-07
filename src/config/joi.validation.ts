import * as Joi from 'joi';

export const JoyValidationSchema = Joi.object({

    MONGODB: Joi.string().uri().required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(7),
    DEFAULT_OFFSET: Joi.number().default(20),

});