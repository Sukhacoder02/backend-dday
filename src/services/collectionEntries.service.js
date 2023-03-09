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

const addValuesToFieldsInCollectionEntry = async (
  collectionEntryId,
  fieldDetails
) => {
  // find collectionEntry
  const gotCollectionEntry = await db.CollectionEntries.findOne({
    where: {
      id: collectionEntryId,
    },
  });
  if (!gotCollectionEntry) {
    throw new Error('CollectionEntry not found');
  }
  const updatedCollectionEntry = await gotCollectionEntry.update({
    fields: gotCollectionEntry.fields.map((field) => {
      if (fieldDetails[field[0]]) {
        return [field[0], fieldDetails[field[0]]];
      }
      return field;
    }),
  });
  return updatedCollectionEntry;
};
const deleteCollectionEntry = async (collectionEntryId) => {
  const gotCollectionEntry = await db.CollectionEntries.findOne({
    where: {
      id: collectionEntryId,
    },
  });
  if (!gotCollectionEntry) {
    throw new Error('CollectionEntry not found');
  }
  await gotCollectionEntry.destroy();
  return gotCollectionEntry;
};

const CollectionEntriesService = {
  createCollectionEntry,
  getCollectionEntries,
  addFieldToCollectionEntry,
  updateFieldName,
  addValuesToFieldsInCollectionEntry,
  deleteCollectionEntry,
};
module.exports = CollectionEntriesService;
