const Joi = require('joi');

const nameBodySchema = Joi.object({
  name: Joi.string().required(),
});
const fieldNameBodySchema = Joi.object({
  fieldName: Joi.string().required(),
});
const idParamSchema = Joi.object({
  id: Joi.string()
    .alphanum()
    .required()
    .regex(/^[0-9]*$/),
});
const updateFieldNameBodySchema = Joi.object({
  oldFieldName: Joi.string().required(),
  newFieldName: Joi.string().required(),
}).required();

const Schemas = {
  nameBodySchema,
  fieldNameBodySchema,
  idParamSchema,
  updateFieldNameBodySchema,
};
module.exports = Schemas;
