const joi = require('@hapi/joi');

const loginSchema = joi.object({
    username: joi.string().alphanum().required(),
    password: joi.string().required()
});
  

module.exports = loginSchema;
  