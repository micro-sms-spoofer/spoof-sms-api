const Joi = require('joi');

const schema = Joi.object({
    text: Joi.string().required(),
    to:  Joi.number().required(),
    from: Joi.string().required(),
})

module.exports.validate = function (body){
    return schema.validate(body);
}