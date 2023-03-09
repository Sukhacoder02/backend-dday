const contentTypeRouter = require('express').Router();
const ContentTypeController = require('../controllers/contentType.controller');

contentTypeRouter.post('/', ContentTypeController.createContentType);
contentTypeRouter.post(
  '/:id/fields',
  ContentTypeController.addContentTypeField
);

module.exports = contentTypeRouter;
