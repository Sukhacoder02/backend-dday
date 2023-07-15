const Joi = require('joi');
const db = require('../../database/models');
const Queries = require('../../utils/Constants/Database/Queries');

const nameParamSchema = Joi.object({
  name: Joi.string()
});
const deleteCollectionEntrySchema = Joi.object({
  name: Joi.string().required(),
  id: Joi.number().required(),
}).required();
const fieldDetailsBodySchema = Joi.object({
  fieldDetails: Joi.object().required(),
});

const addNewCollectionEntrySchema = Joi.object({
  contentTypeId: Joi.number().required(),
  fieldDetails: Joi.object().required(),
});

const getSchemaForCollectionEntry = async (tableName, required = true) => {
  let result = await db.sequelize.query(Queries.GET_ALL_COLUMNS(tableName));
  result = result[0];
  const schemaObj = {};
  result.forEach((column) => {
    if (column.column_name === 'id') return;
    schemaObj[column.column_name] = required ? Joi.string().required() : Joi.string();
  });
  return required ? Joi.object(schemaObj).required() : Joi.object(schemaObj);
};
const Schemas = {
  nameParamSchema,
  fieldDetailsBodySchema,
  addNewCollectionEntrySchema,
  getSchemaForCollectionEntry,
  deleteCollectionEntrySchema
};

module.exports = Schemas;
