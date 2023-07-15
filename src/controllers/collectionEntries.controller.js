const CollectionEntriesService = require('../services/collectionEntries.service');

const getCollectionEntries = async (req, res) => {
  const collectionEntries = await CollectionEntriesService.getCollectionEntries(
    req.user
  );
  res.status(200).json(collectionEntries);
};
// implement getCollectionEntry with specific contentTypeId
const getCollectionEntry = async (req, res) => {
  const { name } = req.params;
  try {
    const collectionEntries = await CollectionEntriesService.getCollectionEntry(
      req.user,
      name
    );
    res.status(200).json(collectionEntries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// edit collectionEntry
const addValuesToFieldsInCollectionEntry = async (req, res) => {
  const contentTypeName = req.params.name, collectionEntryId = req.params.id;

  const fieldDetails = req.body;
  try {
    await CollectionEntriesService.editCollectionEntry(
      req.user,
      contentTypeName,
      collectionEntryId,
      fieldDetails
    );
    res.status(200).json({ message: 'Collection-Entry updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteCollectionEntry = async (req, res) => {
  const contentTypeName = req.params.name;
  const collectionEntryId = req.params.id;
  try {
    await CollectionEntriesService.deleteCollectionEntry(req.user, contentTypeName, collectionEntryId);
    res.status(200).json({ message: 'Collection-Entry deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addNewCollectionEntry = async (req, res) => {
  const contentTypeName = req.params.name;
  const fieldDetails = req.body;
  try {
    await CollectionEntriesService.addNewCollectionEntry(
      req.user,
      contentTypeName,
      fieldDetails
    );
    res.status(200).json({ message: 'Collection-Entry added successfully' });
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
