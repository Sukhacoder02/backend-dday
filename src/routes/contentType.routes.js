const contentTypeRouter = require('express').Router();
const ContentTypeController = require('../controllers/contentType.controller');
const validate = require('../middlewares/ContentType');
const Schemas = require('../middlewares/ContentType/schemas.validator');
const validateToken = require('../middlewares/Auth');

contentTypeRouter.get(
  '/',
  validateToken(),
  ContentTypeController.getAllContentTypes
);
// implement getContentTypeById
contentTypeRouter.get(
  '/:id',
  validateToken(),
  validate(Schemas.idParamSchema, 'params'),
  ContentTypeController.getContentTypeById
);
contentTypeRouter.post(
  '/',
  validateToken(),
  validate(Schemas.nameBodySchema, 'body'),
  ContentTypeController.createContentType
);
contentTypeRouter.post(
  '/:id/fields/add',
  validateToken(),
  validate(Schemas.idParamSchema, 'params'),
  validate(Schemas.fieldNameBodySchema, 'body'),
  ContentTypeController.updateContentTypeFieldArray
);
contentTypeRouter.delete(
  '/:id/fields/delete',
  validateToken(),
  validate(Schemas.idParamSchema, 'params'),
  validate(Schemas.fieldNameBodySchema, 'body'),
  ContentTypeController.deleteFromContentTypeFieldArray
);
contentTypeRouter.patch(
  '/:id/fields/update',
  validateToken(),
  validate(Schemas.idParamSchema, 'params'),
  validate(Schemas.updateFieldNameBodySchema, 'body'),
  ContentTypeController.updateFieldName
);
module.exports = contentTypeRouter;
