const db = require('../../src/database/models');
const CollectionEntriesService = require('../../src/services/collectionEntries.service');
const mockedProperty = {
  contentTypeId: 1,
  id: 1,
  fields: [],
  __proto__: {
    update: async () => true,
  },
};
describe('CollectionEntriesService', () => {
  describe('createCollectionEntry', () => {
    it('Should create collection entry', async () => {
      const email = 'test@example.com';
      jest.spyOn(db.CollectionEntries, 'create').mockResolvedValueOnce({
        id: 1,
        email,
        contentTypeId: 1,
        fields: [],
      });
      const createdCollectionEntry =
        await CollectionEntriesService.createCollectionEntry(email, 1);
      expect(createdCollectionEntry).toEqual({
        id: 1,
        email,
        contentTypeId: 1,
        fields: [],
      });
    });
  });
  describe('getCollectionEntries', () => {
    it('Should return collection entries', async () => {
      const email = 'test@example.com';
      jest.spyOn(db.CollectionEntries, 'findAll').mockResolvedValueOnce([
        {
          id: 1,
          email,
          contentTypeId: 1,
          fields: [],
        },
      ]);
      const gotCollectionEntries =
        await CollectionEntriesService.getCollectionEntries(email);
      expect(gotCollectionEntries).toEqual([
        {
          id: 1,
          email,
          contentTypeId: 1,
          fields: [],
        },
      ]);
    });
  });
  describe('getCollectionEntry', () => {
    it('Should return collection entry', async () => {
      const email = 'test@example.com';
      jest.spyOn(db.CollectionEntries, 'findAll').mockResolvedValueOnce([
        {
          id: 1,
          email,
          contentTypeId: 1,
          fields: [],
        },
      ]);
      const gotCollectionEntry =
        await CollectionEntriesService.getCollectionEntry(email, 1);
      expect(gotCollectionEntry).toEqual([
        {
          id: 1,
          email,
          contentTypeId: 1,
          fields: [],
        },
      ]);
    });
    it('Should throw error if collection entry not found', async () => {
      const email = 'test@example.com';
      jest.spyOn(db.CollectionEntries, 'findAll').mockResolvedValueOnce(null);
      await expect(
        CollectionEntriesService.getCollectionEntry(email, 1)
      ).rejects.toThrow('CollectionEntry not found');
    });
  });
  describe('addFieldToCollectionEntry', () => {
    it('Should add field to collection entry', async () => {
      const email = 'test@example.com';
      jest
        .spyOn(db.CollectionEntries, 'findOne')
        .mockResolvedValueOnce(mockedProperty);

      jest.spyOn(mockedProperty, 'update').mockResolvedValueOnce(true);
      const gotCollectionEntry =
        await CollectionEntriesService.addFieldToCollectionEntry(
          email,
          1,
          'test'
        );
      expect(gotCollectionEntry).toEqual(true);
    });
    it('Shoud throw error if collection entry not found', async () => {
      const email = 'test@example.com';
      jest.spyOn(db.CollectionEntries, 'findOne').mockResolvedValueOnce(null);
      await expect(
        CollectionEntriesService.addFieldToCollectionEntry(email, 1, 'test')
      ).rejects.toThrow('CollectionEntry not found');
    });
    it('Shoud throw error if field already exists', async () => {
      const email = 'test@example.com';
      const mockedPropertyForThisTest = {
        ...mockedProperty,
        fields: [['test', '']],
      };
      jest
        .spyOn(db.CollectionEntries, 'findOne')
        .mockResolvedValueOnce(mockedPropertyForThisTest);
      await expect(
        CollectionEntriesService.addFieldToCollectionEntry(email, 1, 'test')
      ).rejects.toThrow('Field already exists');
    });
  });
  describe('updateFieldName', () => {
    it('Should update field name', async () => {
      const email = 'test@example.com';
      const mockedPropertyForThisTest = {
        ...mockedProperty,
        fields: [['test', '']],
      };
      jest
        .spyOn(db.CollectionEntries, 'findOne')
        .mockResolvedValueOnce(mockedPropertyForThisTest);
      // spy on update method
      jest
        .spyOn(mockedPropertyForThisTest, 'update')
        .mockResolvedValueOnce(true);
      const gotCollectionEntry = await CollectionEntriesService.updateFieldName(
        email,
        1,
        'test',
        'test2'
      );
      expect(gotCollectionEntry).toEqual(true);
    });
    it('Shoud throw error if collection entry not found', async () => {
      const email = 'test@example.com';
      jest.spyOn(db.CollectionEntries, 'findOne').mockResolvedValueOnce(null);
      await expect(
        CollectionEntriesService.updateFieldName(email, 1, 'test', 'test2')
      ).rejects.toThrow('CollectionEntry not found');
    });
    it('Shoud throw error if field not found', async () => {
      const email = 'test#example.com';
      const mockedPropertyForThisTest = {
        ...mockedProperty,
        fields: [['test', '']],
      };
      jest
        .spyOn(db.CollectionEntries, 'findOne')
        .mockResolvedValueOnce(mockedPropertyForThisTest);
      await expect(
        CollectionEntriesService.updateFieldName(email, 1, 'test2', 'test3')
      ).rejects.toThrow('Field does not exist in collectionEntry');
    });
  });
  describe('addValuesToFieldsInCollectionEntry', () => {
    it('Should add values to fields in collection entry', async () => {
      const email = 'test@example.com';
      const mockedPropertyForThisTest = {
        ...mockedProperty,
        fields: [['test', '']],
      };
      jest
        .spyOn(db.CollectionEntries, 'findOne')
        .mockResolvedValueOnce(mockedPropertyForThisTest);
      // spy on update method
      jest
        .spyOn(mockedPropertyForThisTest, 'update')
        .mockResolvedValueOnce(true);
      const gotCollectionEntry =
        await CollectionEntriesService.addValuesToFieldsInCollectionEntry(
          email,
          1,
          [['test', 'test2']]
        );
      expect(gotCollectionEntry).toEqual(true);
    });
  });
  describe('deleteCollectionEntry', () => {
    it('Should delete collection entry', async () => {
      const mockedPropertyForThisTest = {
        ...mockedProperty,
        __proto__: {
          destroy: async () => true,
        },
      };
      const email = 'test@example.com';
      jest
        .spyOn(db.CollectionEntries, 'findOne')
        .mockResolvedValueOnce(mockedPropertyForThisTest);
      jest
        .spyOn(mockedPropertyForThisTest, 'destroy')
        .mockResolvedValueOnce(true);
      const gotCollectionEntry =
        await CollectionEntriesService.deleteCollectionEntry(email, 1);
      expect(gotCollectionEntry).toEqual(mockedPropertyForThisTest);
    });
    it('Should throw error if collection entry not found', async () => {
      const email = 'test@example.com';
      jest.spyOn(db.CollectionEntries, 'findOne').mockResolvedValueOnce(null);
      await expect(
        CollectionEntriesService.deleteCollectionEntry(email, 1)
      ).rejects.toThrow('CollectionEntry not found');
    });
  });
});
