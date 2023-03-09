const collectionEntriesRouter = require('express').Router();
const CollectionEntriesController = require('../controllers/collectionEntries.controller');
const validate = require('../middlewares/CollectionEntries');
const Schemas = require('../middlewares/CollectionEntries/schemas.validator');
const validateToken = require('../middlewares/Auth');
collectionEntriesRouter.get(
  '/',
  validateToken(),
  CollectionEntriesController.getCollectionEntries
);
collectionEntriesRouter.post(
  '/:id',
  validateToken(),
  validate(Schemas.idParamSchema, 'params'),
  validate(Schemas.fieldDetailsBodySchema, 'body'),
  CollectionEntriesController.addValuesToFieldsInCollectionEntry
);
collectionEntriesRouter.delete(
  '/:id',
  validateToken(),
  validate(Schemas.idParamSchema, 'params'),
  CollectionEntriesController.deleteCollectionEntry
);
collectionEntriesRouter.post(
  '/',
  validateToken(),
  validate(Schemas.addNewCollectionEntrySchema, 'body'),
  CollectionEntriesController.addNewCollectionEntry
);
module.exports = collectionEntriesRouter;
