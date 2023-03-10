const ContentTypeController = require('../../src/controllers/contentType.controller');
const ContentTypeService = require('../../src/services/contentType.service');
const mockReq = {
  user: 'user',
  params: {
    id: 1,
  },
  body: {
    name: 'test',
  },
};
const mockRes = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};
describe('ContentTypeController', () => {
  describe('getAllContentTypes', () => {
    it('Should return all content types', async () => {
      jest
        .spyOn(ContentTypeService, 'getAllContentTypes')
        .mockResolvedValueOnce([
          {
            id: 1,
            name: 'test',
            email: 'test#example.com',
          },
        ]);
      await ContentTypeController.getAllContentTypes(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith([
        {
          id: 1,
          name: 'test',
          email: 'test#example.com',
        },
      ]);
    });
    it('Should return error when service throws an error', async () => {
      jest
        .spyOn(ContentTypeService, 'getAllContentTypes')
        .mockRejectedValueOnce(new Error('Error'));
      await ContentTypeController.getAllContentTypes(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Error' });
    });
  });
  describe('getContentTypeById', () => {
    it('Should return content type by id', async () => {
      jest
        .spyOn(ContentTypeService, 'getContentTypeById')
        .mockResolvedValueOnce({
          id: 1,
          name: 'test',
          email: 'test#example.com',
        });
      await ContentTypeController.getContentTypeById(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        id: 1,
        name: 'test',
        email: 'test#example.com',
      });
    });
    it('Should throw an error when service throws an error', async () => {
      jest
        .spyOn(ContentTypeService, 'getContentTypeById')
        .mockRejectedValueOnce(new Error('Error'));
      await ContentTypeController.getContentTypeById(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Error' });
    });
  });
  describe('createContentType', () => {
    it('Should create content type', async () => {
      jest
        .spyOn(ContentTypeService, 'createContentType')
        .mockResolvedValueOnce({
          id: 1,
          name: 'test',
          email: 'test#example.com',
        });
      await ContentTypeController.createContentType(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith({
        id: 1,
        name: 'test',
        email: 'test#example.com',
      });
    });
    it('Should throw an error when service throws an error', async () => {
      jest
        .spyOn(ContentTypeService, 'createContentType')
        .mockRejectedValueOnce(new Error('Error'));
      await ContentTypeController.createContentType(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Error' });
    });
  });
  describe('updateContentTypeFieldArray', () => {
    it('Should update content type field array', async () => {
      jest
        .spyOn(ContentTypeService, 'updateContentTypeFieldArray')
        .mockResolvedValueOnce({
          id: 1,
          name: 'test',
          email: 'test#example.com',
        });
      await ContentTypeController.updateContentTypeFieldArray(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith({
        id: 1,
        name: 'test',
        email: 'test#example.com',
      });
    });
    it('Should throw an error when service throws an error', async () => {
      jest
        .spyOn(ContentTypeService, 'updateContentTypeFieldArray')
        .mockRejectedValueOnce(new Error('Error'));
      await ContentTypeController.updateContentTypeFieldArray(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Error' });
    });
  });
  describe('deleteFromContentTypeFieldArray', () => {
    it('Should delete from content type field array', async () => {
      jest
        .spyOn(ContentTypeService, 'deleteFromContentTypeFieldArray')
        .mockResolvedValueOnce({
          id: 1,
          name: 'test',
          email: 'test#example.com',
        });
      await ContentTypeController.deleteFromContentTypeFieldArray(
        mockReq,
        mockRes
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith({
        id: 1,
        name: 'test',
        email: 'test#example.com',
      });
    });
    it('Should throw an error when service throws an error', async () => {
      jest
        .spyOn(ContentTypeService, 'deleteFromContentTypeFieldArray')
        .mockRejectedValueOnce(new Error('Error'));
      await ContentTypeController.deleteFromContentTypeFieldArray(
        mockReq,
        mockRes
      );
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Error' });
    });
  });
  describe('updateFieldName', () => {
    it('Should update field name', async () => {
      jest.spyOn(ContentTypeService, 'updateFieldName').mockResolvedValueOnce({
        id: 1,
        name: 'test',
        email: 'test#example.com',
      });
      await ContentTypeController.updateFieldName(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith({
        id: 1,
        name: 'test',
        email: 'test#example.com',
      });
    });
    it('Should throw an error when service throws an error', async () => {
      jest
        .spyOn(ContentTypeService, 'updateFieldName')
        .mockRejectedValueOnce(new Error('Error'));
      await ContentTypeController.updateFieldName(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Error' });
    });
  });
});
