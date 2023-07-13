const ContentTypeService = require('../services/contentType.service');

// implement getAllContentType
const getAllContentTypes = async (req, res) => {
  try {
    const contentTypes = await ContentTypeService.getAllContentTypes(req.user);
    res.status(200).send(contentTypes);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
// implement getContentTypeById
const getContentTypeByName = async (req, res) => {
  const { name } = req.params;
  try {
    const contentType = await ContentTypeService.getContentTypeByName(
      req.user,
      name
    );
    res.status(200).send(contentType);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
const createContentType = async (req, res) => {
  const { name } = req.body;
  try {
    await ContentTypeService.createContentType({
      name,
      email: req.user,
    });
    res.status(201).send({ message: 'Content-Type created successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
const updateContentTypeFieldArray = async (req, res) => {
  const { name } = req.params;
  const { fieldName } = req.body;
  try {
    await ContentTypeService.addFieldToContentType(
      req.user,
      name,
      fieldName
    );
    res.status(201).send({ message: 'Field added successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
const deleteFromContentTypeFieldArray = async (req, res) => {
  const { name } = req.params;
  const { fieldName } = req.body;
  try {
    await ContentTypeService.deleteFieldFromContentType(
      req.user,
      name,
      fieldName
    );
    res.status(201).send({ message: 'Field deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
const updateFieldName = async (req, res) => {
  const { name } = req.params;
  const { oldFieldName, newFieldName } = req.body;
  try {
    await ContentTypeService.updateFieldName(
      req.user,
      name,
      oldFieldName,
      newFieldName
    );
    res.status(201).send({ message: 'Field name updated successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const ContentTypeController = {
  createContentType,
  updateContentTypeFieldArray,
  deleteFromContentTypeFieldArray,
  updateFieldName,
  getAllContentTypes,
  getContentTypeByName,
};
module.exports = ContentTypeController;
