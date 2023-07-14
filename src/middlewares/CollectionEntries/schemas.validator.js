const Joi = require('joi');
const db = require('../../database/models');
const Queries = require('../../utils/Constants/Database/Queries');

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

const getSchemaForCollectionEntry = async (tableName) => {
  let result = await db.sequelize.query(Queries.GET_ALL_COLUMNS(tableName));
  result = result[0];
  const schemaObj = {};
  result.forEach((column) => {
    if (column.column_name === 'id') return;
    schemaObj[column.column_name] = Joi.string().required();
  });
  return Joi.object(schemaObj);
};
const Schemas = {
  nameParamSchema,
  fieldDetailsBodySchema,
  addNewCollectionEntrySchema,
  getSchemaForCollectionEntry
};

module.exports = Schemas;
