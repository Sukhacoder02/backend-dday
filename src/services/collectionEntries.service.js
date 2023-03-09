const db = require('../database/models');

const createCollectionEntry = async (contentTypeId) => {
  return await db.CollectionEntries.create({
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
// fieldDetails is of the form
// {
//   'field1': 'value1',
//   'field2': 'value2',
// }
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
  console.log('Found collectionEntry with id: ', gotCollectionEntry.id);
  // if the fields in gotCollectionEntry is empty array add all the fields
  if (gotCollectionEntry.fields.length === 0) {
    // update the found collectionEntry with fieldDetails got as the argument
    const updatedCollectionEntry = await gotCollectionEntry.update({
      fields: Object.keys(fieldDetails).map((key) => [key, fieldDetails[key]]),
    });
    return updatedCollectionEntry;
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
// fieldDetails is of the form
// {
//   'field1': 'value1',
//   'field2': 'value2',
// }
const addNewCollectionEntry = async (contentTypeId, fieldDetails) => {
  // create a new collection entry with the given contentTypeId
  const newCollectionEntry = await createCollectionEntry(contentTypeId);
  // add fields to the collection entry whcih are in the fieldDetails
  const updatedCollectionEntry = await addValuesToFieldsInCollectionEntry(
    newCollectionEntry.id,
    fieldDetails
  );
  return updatedCollectionEntry;
};

const CollectionEntriesService = {
  createCollectionEntry,
  getCollectionEntries,
  addFieldToCollectionEntry,
  updateFieldName,
  addValuesToFieldsInCollectionEntry,
  deleteCollectionEntry,
  addNewCollectionEntry,
};
module.exports = CollectionEntriesService;
