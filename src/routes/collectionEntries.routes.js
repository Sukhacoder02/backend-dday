const collectionEntriesRouter = require('express').Router();
const CollectionEntriesController = require('../controllers/collectionEntries.controller');
const { validate, validateFieldsForCollectionEntry } = require('../middlewares/CollectionEntries');
const Schemas = require('../middlewares/CollectionEntries/schemas.validator');
const validateToken = require('../middlewares/Auth');
collectionEntriesRouter.get(
  '/',
  validateToken(),
  CollectionEntriesController.getCollectionEntries
);
// getCollectionEntry with name of Content-Type
collectionEntriesRouter.get(
  '/:name',
  validateToken(),
  validate(Schemas.nameParamSchema, 'params'),
  CollectionEntriesController.getCollectionEntry
);
collectionEntriesRouter.patch(
  '/:name/:id/edit',
  validateToken(),
  validate(Schemas.deleteCollectionEntrySchema, 'params'),
  validateFieldsForCollectionEntry('body', false),
  CollectionEntriesController.addValuesToFieldsInCollectionEntry
);
collectionEntriesRouter.delete(
  '/:name/:id/delete',
  validateToken(),
  validate(Schemas.deleteCollectionEntrySchema, 'params'),
  CollectionEntriesController.deleteCollectionEntry
);
collectionEntriesRouter.post(
  '/:name/addNewCollectionEntry',
  validateToken(),
  validate(Schemas.nameParamSchema, 'params'),
  validateFieldsForCollectionEntry('body', true),
  CollectionEntriesController.addNewCollectionEntry
);
module.exports = collectionEntriesRouter;
