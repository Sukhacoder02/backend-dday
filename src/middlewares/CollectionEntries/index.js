const validate = (schema, data) => (req, res, next) => {
  // validate schema
  const { error } = schema.validate(req[data]);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
module.exports = validate;
