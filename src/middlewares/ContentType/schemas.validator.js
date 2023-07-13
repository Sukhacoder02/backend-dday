const Joi = require('joi');

const nameSchema = Joi.object({
  name: Joi.string().required(),
});
const fieldNameBodySchema = Joi.object({
  fieldName: Joi.string().required(),
});

const updateFieldNameBodySchema = Joi.object({
  oldFieldName: Joi.string().required(),
  newFieldName: Joi.string().required(),
}).required();

const Schemas = {
  nameSchema,
  fieldNameBodySchema,
  updateFieldNameBodySchema,
};
module.exports = Schemas;
