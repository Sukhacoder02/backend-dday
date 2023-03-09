const CollectionEntriesService = require('../services/collectionEntries.service');

const getCollectionEntries = async (req, res) => {
  const collectionEntries =
    await CollectionEntriesService.getCollectionEntries();
  res.status(200).json(collectionEntries);
};
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
const CollectionEntriesController = {
  getCollectionEntries,
  addValuesToFieldsInCollectionEntry,
};

module.exports = CollectionEntriesController;
