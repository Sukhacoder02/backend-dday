const db = require('../../../database/models')
const attributes = {
  exclude: ['id'],
};
const getContentTypeOrNotFound = async (contentTypeName) => {
  const contentType = await db.GetAllTables.findOne({
    where: {
      table_name: contentTypeName,
    },
    attributes,
  });
  return contentType;
};
module.exports = { attributes, getContentTypeOrNotFound };