const contentTypeRouter = require('express').Router();
const ContentTypeController = require('../controllers/contentType.controller');

contentTypeRouter.post('/', ContentTypeController.createContentType);
contentTypeRouter.post(
  '/:id/fields',
  ContentTypeController.addContentTypeField
);
contentTypeRouter.post(
  '/:id/fields/add',
  ContentTypeController.updateContentTypeFieldArray
);

module.exports = contentTypeRouter;
