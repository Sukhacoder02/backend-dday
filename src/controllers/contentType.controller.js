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

const updateContentTypeFieldArray = async (req, res) => {
  const { id } = req.params;
  const { fieldName } = req.body;
  try {
    const contentType = await ContentTypeService.updateContentTypeFieldArray(
      id,
      fieldName
    );
    res.status(201).send(contentType);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const ContentTypeController = {
  createContentType,
  addContentTypeField,
  updateContentTypeFieldArray,
};
module.exports = ContentTypeController;
