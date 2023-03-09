const db = require('../database/models');

const createContentType = async (contentTypeDetails) => {
  const createdContentType = await db.ContentType.create({
    name: contentTypeDetails.name,
    email: contentTypeDetails.email,
    fields: [],
  });
  return createdContentType;
};

const updateContentTypeFieldArray = async (id, fieldName) => {
  const gotContentType = await db.ContentType.findOne({
    where: {
      id,
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
  return updatedContentType;
};

const deleteFromContentTypeFieldArray = async (id, fieldName) => {
  const gotContentType = await db.ContentType.findOne({
    where: {
      id,
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
const ContentTypeService = {
  createContentType,
  updateContentTypeFieldArray,
  deleteFromContentTypeFieldArray,
};
module.exports = ContentTypeService;
