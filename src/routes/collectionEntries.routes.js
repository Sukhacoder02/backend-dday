const collectionEntriesRouter = require('express').Router();
const CollectionEntriesController = require('../controllers/collectionEntries.controller');
const validate = require('../middlewares/CollectionEntries');
const Schemas = require('../middlewares/CollectionEntries/schemas.validator');

collectionEntriesRouter.get(
  '/',
  CollectionEntriesController.getCollectionEntries
);
collectionEntriesRouter.post(
  '/:id',
  validate(Schemas.idParamSchema, 'params'),
  validate(Schemas.fieldDetailsBodySchema, 'body'),
  CollectionEntriesController.addValuesToFieldsInCollectionEntry
);
collectionEntriesRouter.delete(
  '/:id',
  validate(Schemas.idParamSchema, 'params'),
  CollectionEntriesController.deleteCollectionEntry
);
collectionEntriesRouter.post(
  '/',
  validate(Schemas.addNewCollectionEntrySchema, 'body'),
  CollectionEntriesController.addNewCollectionEntry
);
module.exports = collectionEntriesRouter;
