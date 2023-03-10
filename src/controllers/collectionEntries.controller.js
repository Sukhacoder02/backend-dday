const CollectionEntriesService = require('../services/collectionEntries.service');

const getCollectionEntries = async (req, res) => {
  const collectionEntries = await CollectionEntriesService.getCollectionEntries(
    req.user
  );
  res.status(200).json(collectionEntries);
};
// implement getCollectionEntry with specific contentTypeId
const getCollectionEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const collectionEntries = await CollectionEntriesService.getCollectionEntry(
      req.user,
      id
    );
    res.status(200).json(collectionEntries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// edit collectionEntry
const addValuesToFieldsInCollectionEntry = async (req, res) => {
  const { id } = req.params;
  const { fieldDetails } = req.body;
  try {
    const updatedCollectionEntry =
      await CollectionEntriesService.addValuesToFieldsInCollectionEntry(
        req.user,
        id,
        fieldDetails
      );
    res.status(200).json(updatedCollectionEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteCollectionEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCollectionEntry =
      await CollectionEntriesService.deleteCollectionEntry(req.user, id);
    res.status(200).json(deletedCollectionEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addNewCollectionEntry = async (req, res) => {
  let { contentTypeId, fieldDetails } = req.body;
  try {
    const newCollectionEntry =
      await CollectionEntriesService.addNewCollectionEntry(
        req.user,
        contentTypeId,
        fieldDetails
      );
    res.status(200).json(newCollectionEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const CollectionEntriesController = {
  getCollectionEntries,
  addValuesToFieldsInCollectionEntry,
  deleteCollectionEntry,
  addNewCollectionEntry,
  getCollectionEntry,
};

module.exports = CollectionEntriesController;
