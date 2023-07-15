const db = require('../database/models');
const { getContentTypeOrNotFound } = require('../utils/Constants/Database');
const Queries = require('../utils/Constants/Database/Queries');


const createCollectionEntry = async (email, contentTypeId) => {
  return await db.CollectionEntries.create({
    fields: [],
    email,
    contentTypeId,
  });
};
const getCollectionEntries = (email) => {
  return db.CollectionEntries.findAll({
    where: {
      email,
    },
  });
};

// implement getCollectionEntry with specific contentTypeId
const getCollectionEntry = async (email, contentTypeName) => {
  await getContentTypeOrNotFound(contentTypeName);
  const allEntries = await db.sequelize.query(Queries.GET_ALL_RECORDS(contentTypeName));
  return allEntries[0];
};

const addFieldToCollectionEntry = async (email, contentTypeId, fieldName) => {
  const gotCollectionEntry = await db.CollectionEntries.findOne({
    where: {
      contentTypeId,
      email,
    },
  });
  if (!gotCollectionEntry) {
    throw new Error('CollectionEntry not found');
  }
  if (gotCollectionEntry.fields.some((field) => field[0] === fieldName)) {
    throw new Error('Field already exists');
  }
  const updatedCollectionEntry = await gotCollectionEntry.update({
    fields: [...gotCollectionEntry.fields, [fieldName, '']],
  });
  return updatedCollectionEntry;
};

const updateFieldName = async (
  email,
  contentTypeId,
  oldFieldName,
  newFieldName
) => {
  const gotCollectionEntry = await db.CollectionEntries.findOne({
    where: {
      contentTypeId,
      email,
    },
  });
  if (!gotCollectionEntry) {
    throw new Error('CollectionEntry not found');
  }
  if (!gotCollectionEntry.fields.some((field) => field[0] === oldFieldName)) {
    throw new Error('Field does not exist in collectionEntry');
  }
  const updatedCollectionEntry = await gotCollectionEntry.update({
    fields: gotCollectionEntry.fields.map((field) => {
      if (field[0] === oldFieldName) {
        return [newFieldName, field[1]];
      }
      return field;
    }),
  });
  return updatedCollectionEntry;
};
// fieldDetails is of the form
// {
//   'field1': 'value1',
//   'field2': 'value2',
// }
const editCollectionEntry = async (
  email,
  contentTypeName,
  collectionEntryId,
  fieldDetails
) => {
  await getContentTypeOrNotFound(contentTypeName);
  const query = Queries.UPDATE_RECORD(contentTypeName, collectionEntryId, fieldDetails);
  await db.sequelize.query(query);
};
const deleteCollectionEntry = async (email, contentTypeName, collectionEntryId) => {
  await getContentTypeOrNotFound(contentTypeName);
  const query = Queries.DELETE_RECORD(contentTypeName, collectionEntryId);
  console.log(query);
  await db.sequelize.query(query);
};

const addNewCollectionEntry = async (email, contentTypeName, fieldDetails) => {
  await getContentTypeOrNotFound(contentTypeName);
  const query = Queries.INSERT_INTO(contentTypeName, fieldDetails);
  await db.sequelize.query(query);
};

const CollectionEntriesService = {
  createCollectionEntry,
  getCollectionEntries,
  addFieldToCollectionEntry,
  updateFieldName,
  editCollectionEntry,
  deleteCollectionEntry,
  addNewCollectionEntry,
  getCollectionEntry,
};
module.exports = CollectionEntriesService;
