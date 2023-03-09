const express = require('express');
const contentTypeRouter = express.Router();
const { validateBody, contentTypeSchema, contentTypeFieldSchema } = require('../middlewares/joiValidator');
const contentTypeController = require('../controllers/contentTypeControllers');

contentTypeRouter.post('/', validateBody(contentTypeSchema) ,contentTypeController.addNewContentType);
contentTypeRouter.post('/content', validateBody(contentTypeFieldSchema) ,contentTypeController.addContentTypeFields);

module.exports = contentTypeRouter;
