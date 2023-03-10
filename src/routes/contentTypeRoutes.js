const express = require('express');
const contentTypeRouter = express.Router();
const {
  validateBody,
  contentTypeSchema,
  contentTypeFieldSchema,
  renameContentTypeSchema,
  renameFieldSchema,
} = require('../middlewares/joiValidator');
const contentTypeController = require('../controllers/contentTypeControllers');

contentTypeRouter.post(
  '/',
  validateBody(contentTypeSchema),
  contentTypeController.addNewContentType
);
contentTypeRouter.post(
  '/fields/add',
  validateBody(contentTypeFieldSchema),
  contentTypeController.addContentTypeFields
);
contentTypeRouter.get('/collection', contentTypeController.getAllContentTypes);
contentTypeRouter.patch(
  '/edit',
  validateBody(renameContentTypeSchema),
  contentTypeController.renameContentType
);
contentTypeRouter.patch(
  '/field/edit',
  validateBody(renameFieldSchema),
  contentTypeController.renameField
);
contentTypeRouter.delete('/field/delete', contentTypeController.deleteField);

module.exports = contentTypeRouter;
