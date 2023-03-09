const contentTypeRouter = require('express').Router();
const ContentTypeController = require('../controllers/contentType.controller');

contentTypeRouter.post('/', ContentTypeController.createContentType);

module.exports = contentTypeRouter;
