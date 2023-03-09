const contentTypeRouter = require('express').Router();
const ContentTypeController = require('../controllers/contentType.controller');
const validate = require('../middlewares/ContentType');
const Schemas = require('../middlewares/ContentType/schemas.validator');

contentTypeRouter.post(
  '/',
  validate(Schemas.nameBodySchema, 'body'),
  ContentTypeController.createContentType
);
contentTypeRouter.post(
  '/:id/fields/add',
  validate(Schemas.idParamSchema, 'params'),
  validate(Schemas.fieldNameBodySchema, 'body'),
  ContentTypeController.updateContentTypeFieldArray
);
contentTypeRouter.delete(
  '/:id/fields/delete',
  validate(Schemas.idParamSchema, 'params'),
  validate(Schemas.fieldNameBodySchema, 'body'),
  ContentTypeController.deleteFromContentTypeFieldArray
);
contentTypeRouter.patch(
  '/:id/fields/update',
  validate(Schemas.idParamSchema, 'params'),
  validate(Schemas.updateFieldNameBodySchema, 'body'),
  ContentTypeController.updateFieldName
);
module.exports = contentTypeRouter;
