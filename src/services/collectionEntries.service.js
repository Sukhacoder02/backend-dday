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

const addFieldToCollectionEntry = async (id, fieldName) => {
  const gotCollectionEntry = await db.CollectionEntries.findOne({
    where: {
      id,
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

const CollectionEntriesService = {
  createCollectionEntry,
  getCollectionEntries,
  addFieldToCollectionEntry,
};
module.exports = CollectionEntriesService;
