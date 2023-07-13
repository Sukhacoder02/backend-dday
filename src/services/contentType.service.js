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
  await ContentTypeService.deleteFieldFromContentType(contentTypeDetails.email, contentTypeDetails.name, 'id');
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

const deleteFieldFromContentType = async (email, name, fieldName) => {
  await getContentTypeOrNotFound(name);
  const gotContentType = await ContentTypeService.getContentTypeByName(email, name);
  if (!gotContentType.some((column) => column.column_name === fieldName)) {
    throw new Error('Field does not exist');
  }
  await db.sequelize.queryInterface.removeColumn(name, fieldName);
};

const updateFieldName = async (email, name, oldFieldName, newFieldName) => {
  await getContentTypeOrNotFound(name);
  const gotContentType = await ContentTypeService.getContentTypeByName(email, name);

  if (!gotContentType.some((column) => column.column_name === oldFieldName)) {
    throw new Error('Field does not exist in contentType');
  }
  if (gotContentType.some((column) => column.column_name === newFieldName)) {
    throw new Error('Field already exists');
  }
  await db.sequelize.queryInterface.renameColumn(name, oldFieldName, newFieldName);
};

const updateContentTypeName = async (email, oldName, newName) => {
  await getContentTypeOrNotFound(oldName);
  await db.sequelize.queryInterface.renameTable(oldName, newName);
};
const ContentTypeService = {
  createContentType,
  addFieldToContentType,
  deleteFieldFromContentType,
  updateFieldName,
  getAllContentTypes,
  getContentTypeByName,
  updateContentTypeName
};
module.exports = ContentTypeService;
