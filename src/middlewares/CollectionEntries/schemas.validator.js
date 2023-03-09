const Joi = require('joi');

const idParamSchema = Joi.object({
  id: Joi.string()
    .alphanum()
    .required()
    .regex(/^[0-9]*$/),
});

const fieldDetailsBodySchema = Joi.object({
  fieldDetails: Joi.object().required(),
});

const addNewCollectionEntrySchema = Joi.object({
  contentTypeId: Joi.number().required(),
  fieldDetails: Joi.object().required(),
});

const Schemas = {
  idParamSchema,
  fieldDetailsBodySchema,
  addNewCollectionEntrySchema,
};

module.exports = Schemas;
