const Joi = require('joi');

const nameParamSchema = Joi.object({
  name: Joi.string()
});

const fieldDetailsBodySchema = Joi.object({
  fieldDetails: Joi.object().required(),
});

const addNewCollectionEntrySchema = Joi.object({
  contentTypeId: Joi.number().required(),
  fieldDetails: Joi.object().required(),
});

const Schemas = {
  nameParamSchema,
  fieldDetailsBodySchema,
  addNewCollectionEntrySchema,
};

module.exports = Schemas;
