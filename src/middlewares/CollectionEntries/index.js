const { getSchemaForCollectionEntry } = require('./schemas.validator');
const validate = (schema, data) => (req, res, next) => {
  // validate schema
  const { error } = schema.validate(req[data]);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

const validateFieldsForCollectionEntry = (data, required) => async (req, res, next) => {
  const contentTypeName = req.params.name;
  const schema = await getSchemaForCollectionEntry(contentTypeName, required);
  // validate schema
  const { error } = schema.validate(req[data]);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  // disabling this for now
  next();
};
module.exports = { validate, validateFieldsForCollectionEntry };
