const joi = require('@hapi/joi');

const signupSchema = joi.object({
    name: joi.string().required(),
    designation: joi.string().required(),
    username: joi.string().alphanum().required().min(3).max(10),
    email: joi.string().email().required(),
    password: joi.string().required().pattern( new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$') ).message(`
    password must be:
        At least one upper case English letter,
        At least one lower case English letter,
        At least one digit,
        At least one special character,
        Minimum eight in length
    `),
    role: joi.number().required()
});


module.exports = signupSchema;