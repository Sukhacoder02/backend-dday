const Joi = require('joi');
const axios = require('axios');

const tokenSchema = Joi.object({
  token: Joi.string().required(),
});

const tokenValidator = () => async (req, res, next) => {
  try {
    let token = req.headers['authorization'];
    token = token && token.split(' ')[1];

    const { error } = tokenSchema.validate({ token });
    // throw error
    if (error) {
      throw new Error('No token provided');
    }

    const response = await axios.get(`http://${process.env.AUTH_SERVICE_HOST || 'localhost'}:${process.env.AUTH_SERVICE_PORT}/api/token/validate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new HttpError('invalid token', 401);
    } else {
      req.user = response.data.email;
      next();
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = tokenValidator;
