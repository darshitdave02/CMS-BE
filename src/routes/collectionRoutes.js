const express = require('express');
const collectionRouter = express.Router();
// const { validateBody, contentTypeSchema, contentTypeFieldSchema } = require('../middlewares/joiValidator');
const collectionController = require('../controllers/collectionControllers');

collectionRouter.get('/:collectionName', collectionController.getCollectionData);
collectionRouter.post('/fields/:collectionName' ,collectionController.getCollectionFields);


module.exports = collectionRouter;
