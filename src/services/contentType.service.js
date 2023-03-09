const db = require('../database/models');

const createContentType = async (contentTypeDetails) => {
  const createdContentType = await db.ContentType.create({
    name: contentTypeDetails.name,
    email: contentTypeDetails.email,
    fields: [],
  });
  return createdContentType;
};

const ContentTypeService = {
  createContentType,
};
module.exports = ContentTypeService;
