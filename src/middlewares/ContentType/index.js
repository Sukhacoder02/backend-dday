const validate = (schema, data) => (req, res, next) => {
  // validate the schema with req.data
  const { error } = schema.validate(req[data]);
  // if error, return 400 and the error message
  if (error) {
    return res.status(400).send({ message: error.message });
  }
  // if no error, call next
  next();
};

module.exports = validate;
