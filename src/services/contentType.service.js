const db = require('../database/models');
const CollectionEntriesService = require('./collectionEntries.service');
const { attributes, getContentTypeOrNotFound } = require('../utils/Constants/Database')
const Queries = require('../utils/Constants/Database/Queries')

// create getAllContentTypes service
const getAllContentTypes = async (email) => {
  const allContentTypes = await db.GetAllTables.FindAll();
  return allContentTypes;
};
// create getContentTypeById service
const getContentTypeByName = async (email, name) => {
  await getContentTypeOrNotFound(name);
  // get all columns of the table
  const query = Queries.GET_ALL_COLUMNS(name);
  let result = await db.sequelize.query(Queries.GET_ALL_COLUMNS(name));
  result = result[0];
  return result;
};
const createContentType = async (contentTypeDetails) => {
  // throw error if content type already exists
  const gotTable = await db.GetAllTables.findOne({
    where: {
      table_name: contentTypeDetails.name,
    },
    attributes
  });
  if (gotTable) {
    throw new Error('Content-Type already exists');
  }
  // create a table with name using queryInterface with just id column
  await db.sequelize.queryInterface.createTable(contentTypeDetails.name, {
    id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  });
};

const addFieldToContentType = async (email, name, fieldName) => {
  await getContentTypeOrNotFound(name);
  const gotContentType = await ContentTypeService.getContentTypeByName(email, name);
  const alreadyExists = gotContentType.some((column) => column.column_name === fieldName);
  if (alreadyExists) {
    throw new Error('Field already exists');
  }
  // add new column to the table with name 'name'
  await db.sequelize.queryInterface.addColumn(name, fieldName, {
    type: db.Sequelize.STRING,
  });
};

const deleteFromContentTypeFieldArray = async (email, id, fieldName) => {
  const gotContentType = await db.ContentType.findOne({
    where: {
      id,
      email,
    },
  });
  if (!gotContentType) {
    throw new Error('ContentType not found');
  }
  if (!gotContentType.fields.some((field) => field[0] === fieldName)) {
    throw new Error('Field does not exist');
  }
  const updatedContentType = await gotContentType.update({
    fields: gotContentType.fields.filter((field) => field[0] !== fieldName),
  });

  return updatedContentType;
};

const updateFieldName = async (email, id, oldFieldName, newFieldName) => {
  const gotContentType = await db.ContentType.findOne({
    where: {
      id,
      email,
    },
  });
  if (!gotContentType) {
    throw new Error('ContentType not found');
  }
  console.log('Content-Type is found', gotContentType.name);
  if (!gotContentType.fields.some((field) => field[0] === oldFieldName)) {
    throw new Error('Field does not exist in contentType');
  }
  if (gotContentType.fields.some((field) => field[0] === newFieldName)) {
    throw new Error('Field already exists');
  }
  const updatedContentType = await gotContentType.update({
    fields: gotContentType.fields.map((field) => {
      if (field[0] === oldFieldName) {
        return [newFieldName, field[1]];
      }
      return field;
    }),
  });
  await CollectionEntriesService.updateFieldName(
    email,
    updatedContentType.id,
    oldFieldName,
    newFieldName
  );
  return updatedContentType;
};
const ContentTypeService = {
  createContentType,
  addFieldToContentType,
  deleteFromContentTypeFieldArray,
  updateFieldName,
  getAllContentTypes,
  getContentTypeByName,
};
module.exports = ContentTypeService;
