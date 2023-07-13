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
  if (!contentType) {
    throw new Error('Content-Type not found');
  }
};
module.exports = { attributes, getContentTypeOrNotFound };