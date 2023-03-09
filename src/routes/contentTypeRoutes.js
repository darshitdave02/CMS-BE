const express = require('express');
const contentTypeRouter = express.Router();
const { validateBody, contentTypeSchema, contentTypeFieldSchema } = require('../middlewares/joiValidator');
const contentTypeController = require('../controllers/contentTypeControllers');

contentTypeRouter.post('/', validateBody(contentTypeSchema) ,contentTypeController.addNewContentType);
contentTypeRouter.post('/fields/add', validateBody(contentTypeFieldSchema) ,contentTypeController.addContentTypeFields);
contentTypeRouter.get('/collection' ,contentTypeController.getAllContentTypes);
contentTypeRouter.get('/fields' ,contentTypeController.getCollectionFields);

module.exports = contentTypeRouter;
