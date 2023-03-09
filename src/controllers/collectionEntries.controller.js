const CollectionEntriesService = require('../services/collectionEntries.service');

const getCollectionEntries = async (req, res) => {
  const collectionEntries =
    await CollectionEntriesService.getCollectionEntries();
  res.status(200).json(collectionEntries);
};
// edit collectionEntry
const addValuesToFieldsInCollectionEntry = async (req, res) => {
  const { id } = req.params;
  const { fieldDetails } = req.body;
  try {
    const updatedCollectionEntry =
      await CollectionEntriesService.addValuesToFieldsInCollectionEntry(
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
      await CollectionEntriesService.deleteCollectionEntry(id);
    res.status(200).json(deletedCollectionEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addNewCollectionEntry = async (req, res) => {
  let { contentTypeId, fieldDetails } = req.body;
  // convert contentTypeId to integer
  contentTypeId = parseInt(contentTypeId);

  try {
    const newCollectionEntry =
      await CollectionEntriesService.addNewCollectionEntry(
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
};

module.exports = CollectionEntriesController;
