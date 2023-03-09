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

const updateFieldName = async (id, oldFieldName, newFieldName) => {
  const gotContentType = await db.ContentType.findOne({
    where: {
      id,
    },
  });
  if (!gotContentType) {
    throw new Error('ContentType not found');
  }
  if (!gotContentType.fields.some((field) => field[0] === oldFieldName)) {
    throw new Error('Field does not exist');
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
  return updatedContentType;
};
const ContentTypeService = {
  createContentType,
  updateContentTypeFieldArray,
  deleteFromContentTypeFieldArray,
  updateFieldName,
};
module.exports = ContentTypeService;
