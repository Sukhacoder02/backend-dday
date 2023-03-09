const collectionEntriesRouter = require('express').Router();
const CollectionEntriesController = require('../controllers/collectionEntries.controller');

collectionEntriesRouter.get(
  '/',
  CollectionEntriesController.getCollectionEntries
);
collectionEntriesRouter.post(
  '/:id',
  CollectionEntriesController.addValuesToFieldsInCollectionEntry
);
collectionEntriesRouter.delete(
  '/:id',
  CollectionEntriesController.deleteCollectionEntry
);
collectionEntriesRouter.post(
  '/',
  CollectionEntriesController.addNewCollectionEntry
);
module.exports = collectionEntriesRouter;
