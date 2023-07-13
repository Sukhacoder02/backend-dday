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
// implement getContentTypeByName
contentTypeRouter.get(
  '/:name',
  validateToken(),
  validate(Schemas.nameSchema, 'params'),
  ContentTypeController.getContentTypeByName
);
contentTypeRouter.post(
  '/',
  validateToken(),
  validate(Schemas.nameSchema, 'body'),
  ContentTypeController.createContentType
);
contentTypeRouter.post(
  '/:name/fields/add',
  validateToken(),
  validate(Schemas.nameSchema, 'params'),
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
