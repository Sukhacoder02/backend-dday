const contentTypeRouter = require('express').Router();
const ContentTypeController = require('../controllers/contentType.controller');

contentTypeRouter.post('/', ContentTypeController.createContentType);
contentTypeRouter.post(
  '/:id/fields/add',
  ContentTypeController.updateContentTypeFieldArray
);
contentTypeRouter.delete(
  '/:id/fields/delete',
  ContentTypeController.deleteFromContentTypeFieldArray
);
module.exports = contentTypeRouter;
