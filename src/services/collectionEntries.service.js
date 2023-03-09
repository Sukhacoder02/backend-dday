const db = require('../database/models');

const createCollectionEntry = (contentTypeId) => {
  return db.CollectionEntries.create({
    fields: [],
    email: null,
    contentTypeId,
  });
};
const getCollectionEntries = () => {
  return db.CollectionEntries.findAll();
};

const addFieldToCollectionEntry = async (contentTypeId, fieldName) => {
  const gotCollectionEntry = await db.CollectionEntries.findOne({
    where: {
      contentTypeId,
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

const updateFieldName = async (contentTypeId, oldFieldName, newFieldName) => {
  const gotCollectionEntry = await db.CollectionEntries.findOne({
    where: {
      contentTypeId,
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

const CollectionEntriesService = {
  createCollectionEntry,
  getCollectionEntries,
  addFieldToCollectionEntry,
  updateFieldName,
};
module.exports = CollectionEntriesService;
