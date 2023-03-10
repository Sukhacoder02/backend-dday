const db = require('../database/models');
const CollectionEntriesService = require('./collectionEntries.service');

// create getAllContentTypes service
const getAllContentTypes = async (email) => {
  const gotContentTypes = await db.ContentType.findAll({
    where: {
      email,
    },
    attributes: ['name', 'id'],
  });
  return gotContentTypes;
};
// create getContentTypeById service
const getContentTypeById = async (email, id) => {
  const gotContentType = await db.ContentType.findOne({
    where: {
      id,
      email,
    },
  });
  if (!gotContentType) {
    throw new Error('ContentType not found');
  }
  return gotContentType;
};
const createContentType = async (contentTypeDetails) => {
  // throw error if content type already exists
  const gotContentType = await db.ContentType.findOne({
    where: {
      name: contentTypeDetails.name,
      email: contentTypeDetails.email,
    },
  });
  if (gotContentType) {
    throw new Error('ContentType already exists');
  }
  const createdContentType = await db.ContentType.create({
    name: contentTypeDetails.name,
    email: contentTypeDetails.email,
    fields: [],
  });
  await CollectionEntriesService.createCollectionEntry(
    contentTypeDetails.email,
    createdContentType.id
  );
  return createdContentType;
};

const updateContentTypeFieldArray = async (email, id, fieldName) => {
  const gotContentType = await db.ContentType.findOne({
    where: {
      id,
      email,
    },
  });
  if (!gotContentType) {
    throw new Error('ContentType not found');
  }
  if (gotContentType.fields.some((field) => field[0] === fieldName)) {
    throw new Error('Field already exists');
  }
  const updatedContentType = await gotContentType.update({
    fields: [...gotContentType.fields, [fieldName, 'Text']],
  });

  await CollectionEntriesService.addFieldToCollectionEntry(
    email,
    updatedContentType.id,
    fieldName
  );
  return updatedContentType;
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
  updateContentTypeFieldArray,
  deleteFromContentTypeFieldArray,
  updateFieldName,
  getAllContentTypes,
  getContentTypeById,
};
module.exports = ContentTypeService;
