const ContentTypeService = require('../services/contentType.service');

const createContentType = async (req, res) => {
  const { name } = req.body;
  try {
    const contentType = await ContentTypeService.createContentType({
      name,
      email: null,
    });
    res.status(201).send(contentType);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
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
const deleteFromContentTypeFieldArray = async (req, res) => {
  const { id } = req.params;
  const { fieldName } = req.body;
  try {
    const contentType =
      await ContentTypeService.deleteFromContentTypeFieldArray(id, fieldName);
    res.status(201).send(contentType);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const updateFieldName = async (req, res) => {
  const { id } = req.params;
  const { oldFieldName, newFieldName } = req.body;
  try {
    const contentType = await ContentTypeService.updateFieldName(
      id,
      oldFieldName,
      newFieldName
    );
    res.status(201).send(contentType);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const ContentTypeController = {
  createContentType,
  updateContentTypeFieldArray,
  deleteFromContentTypeFieldArray,
  updateFieldName,
};
module.exports = ContentTypeController;
