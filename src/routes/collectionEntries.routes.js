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
module.exports = collectionEntriesRouter;
