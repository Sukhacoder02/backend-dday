const ContentTypeService = require('../services/contentType.service');

const createContentType = async (req, res) => {
  const { name } = req.body;
  const contentType = await ContentTypeService.createContentType({
    name,
    email: null,
  });
  res.status(201).send(contentType);
};
const addContentTypeField = async (req, res) => {
  const { id } = req.params;
  const contentType = await ContentTypeService.addContentTypeField(id);
  res.status(201).send(contentType);
};
const ContentTypeController = {
  createContentType,
  addContentTypeField,
};
module.exports = ContentTypeController;
