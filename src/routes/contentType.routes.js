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
contentTypeRouter.patch(
  '/:id/fields/update',
  ContentTypeController.updateFieldName
);
module.exports = contentTypeRouter;
