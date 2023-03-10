const ContentTypeService = require('../../src/services/contentType.service');
const db = require('../../src/database/models');
const CollectionEntriesService = require('../../src/services/collectionEntries.service');
const mockedProperty = {
  name: 'Company',
  id: 19,
  fields: [],
  __proto__: {
    update: async () => true,
  },
};
jest.mock('../../src/services/collectionEntries.service');
describe('ContentTypeService', () => {
  describe('getAllContentTypes', () => {
    it('Should return all content types', async () => {
      const email = 'test@example.com';
      jest.spyOn(db.ContentType, 'findAll').mockResolvedValueOnce([
        {
          name: 'Company',
          id: 19,
        },
      ]);
      const gotContentTypes = await ContentTypeService.getAllContentTypes(
        email
      );
      expect(gotContentTypes).toEqual([
        {
          name: 'Company',
          id: 19,
        },
      ]);
    });
  });
  describe('getContentTypeById', () => {
    it('Should return content type by id', async () => {
      const email = 'test@example.com';
      const id = 19;
      jest.spyOn(db.ContentType, 'findOne').mockResolvedValueOnce({
        name: 'Company',
        id: 19,
      });
      const gotContentType = await ContentTypeService.getContentTypeById(
        email,
        id
      );
      expect(gotContentType).toEqual({
        name: 'Company',
        id: 19,
      });
    });
    it('Should throw error if content type not found', async () => {
      const email = 'test@example.com';
      const id = 19;
      jest.spyOn(db.ContentType, 'findOne').mockResolvedValueOnce(null);
      await expect(
        ContentTypeService.getContentTypeById(email, id)
      ).rejects.toThrow('ContentType not found');
    });
  });
  describe('createContentType', () => {
    it('Should create content type', async () => {
      const contentTypeDetails = {
        name: 'Company',
        email: 'test@example.com',
      };
      jest.spyOn(db.ContentType, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(db.ContentType, 'create').mockResolvedValueOnce({
        name: 'Company',
        id: 19,
      });
      jest
        .spyOn(CollectionEntriesService, 'createCollectionEntry')
        .mockResolvedValueOnce(true);
      const createdContentType = await ContentTypeService.createContentType(
        contentTypeDetails
      );
      expect(createdContentType).toEqual({
        name: 'Company',
        id: 19,
      });
    });
    it('Should throw an error if content type already exists', async () => {
      const contentTypeDetails = {
        name: 'Company',
        email: 'test#example.com',
      };
      jest.spyOn(db.ContentType, 'findOne').mockResolvedValueOnce({
        name: 'Company',
        id: 19,
      });
      await expect(
        ContentTypeService.createContentType(contentTypeDetails)
      ).rejects.toThrow('ContentType already exists');
    });
  });
  describe('updateContentTypeFieldArray', () => {
    it('Should update content type field array', async () => {
      const email = 'test@example.com';
      const id = 19;
      const fieldName = 'name';
      jest
        .spyOn(db.ContentType, 'findOne')
        .mockImplementationOnce(() => mockedProperty);

      jest.spyOn(mockedProperty, 'update').mockResolvedValueOnce(true);
      jest
        .spyOn(CollectionEntriesService, 'addFieldToCollectionEntry')
        .mockResolvedValueOnce(true);
      const updatedContentType =
        await ContentTypeService.updateContentTypeFieldArray(
          email,
          id,
          fieldName
        );
      expect(updatedContentType).toEqual(true);
    });
    it('Should throw error if content type not found', async () => {
      const email = 'test@example.com';
      const id = 19;
      const fieldName = 'name';
      jest.spyOn(db.ContentType, 'findOne').mockResolvedValueOnce(null);
      await expect(
        ContentTypeService.updateContentTypeFieldArray(email, id, fieldName)
      ).rejects.toThrow('ContentType not found');
    });
    it('Should throw error if field already exists', async () => {
      const email = 'test@example.com';
      const fieldName = 'name';

      jest.spyOn(db.ContentType, 'findOne').mockResolvedValueOnce({
        name: 'Company',
        id: 19,
        fields: [['name', 'Text']],
      });
      await expect(
        ContentTypeService.updateContentTypeFieldArray(email, 19, fieldName)
      ).rejects.toThrow('Field already exists');
    });
  });
  describe('deleteFromContentTypeFieldArray', () => {
    it('Should delete from content type field array', async () => {
      const email = 'test@example.com';
      const id = 19;
      const fieldName = 'name';
      const mockedPropertyForThisTest = {
        ...mockedProperty,
        fields: [['name', 'Text']],
      };
      jest
        .spyOn(db.ContentType, 'findOne')
        .mockImplementationOnce(() => mockedPropertyForThisTest);

      console.log(mockedPropertyForThisTest);
      jest
        .spyOn(mockedPropertyForThisTest, 'update')
        .mockResolvedValueOnce(true);
      const updatedContentType =
        await ContentTypeService.deleteFromContentTypeFieldArray(
          email,
          id,
          fieldName
        );
      expect(updatedContentType).toEqual(true);
    });
    it('Should throw error if content type not found', async () => {
      const email = 'test@example.com';
      const id = 19;
      const fieldName = 'name';
      jest.spyOn(db.ContentType, 'findOne').mockResolvedValueOnce(null);
      await expect(
        ContentTypeService.deleteFromContentTypeFieldArray(email, id, fieldName)
      ).rejects.toThrow('ContentType not found');
    });
    it('Should throw error if field does not exist', async () => {
      const email = 'test@example.com';
      const id = 19;
      const fieldName = 'name';
      jest.spyOn(db.ContentType, 'findOne').mockResolvedValueOnce({
        name: 'Company',
        id: 19,
        fields: [],
      });
      await expect(
        ContentTypeService.deleteFromContentTypeFieldArray(email, id, fieldName)
      ).rejects.toThrow('Field does not exist');
    });
  });
  describe('updateFieldName', () => {
    it('Should update field name', async () => {
      const email = 'test@example.com';
      const id = 19;
      const oldFieldName = 'name';
      const newFieldName = 'companyName';
      const mockedPropertyForThisTest = {
        ...mockedProperty,
        fields: [['name', 'Text']],
      };
      jest
        .spyOn(db.ContentType, 'findOne')
        .mockImplementationOnce(() => mockedPropertyForThisTest);

      jest
        .spyOn(mockedPropertyForThisTest, 'update')
        .mockResolvedValueOnce(true);
      jest
        .spyOn(CollectionEntriesService, 'updateFieldName')
        .mockResolvedValueOnce(true);
      const updatedContentType = await ContentTypeService.updateFieldName(
        email,
        id,
        oldFieldName,
        newFieldName
      );
      expect(updatedContentType).toEqual(true);
    });
    it('Should throw error if content type not found', async () => {
      const email = 'test@example.com';
      const id = 19;
      const oldFieldName = 'name';
      const newFieldName = 'companyName';
      jest.spyOn(db.ContentType, 'findOne').mockResolvedValueOnce(null);
      await expect(
        ContentTypeService.updateFieldName(
          email,
          id,
          oldFieldName,
          newFieldName
        )
      ).rejects.toThrow('ContentType not found');
    });
    it('Should throw error if field does not exist', async () => {
      const email = 'test@example.com';
      const id = 19;
      const oldFieldName = 'name';
      const newFieldName = 'companyName';
      jest.spyOn(db.ContentType, 'findOne').mockResolvedValueOnce({
        name: 'Company',
        id: 19,
        fields: [],
      });
      await expect(
        ContentTypeService.updateFieldName(
          email,
          id,
          oldFieldName,
          newFieldName
        )
      ).rejects.toThrow('Field does not exist');
    });
  });
});
