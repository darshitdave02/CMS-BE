const contentTypeServices = require('../services/contentTypeServices');
const HTTPError = require('../utils/HTTPError');

const addNewContentType = async (request, response) => {
  try {
    const contentType = await contentTypeServices.addNewContentType(
      request.body
    );
    return response.status(201).json({
      status: 201,
      data: contentType,
      message: 'Succesfully Created Content Type',
    });
  } catch (error) {
    if (error instanceof HTTPError)
      return response
        .status(500)
        .json({ status: error.code, message: error.message });
    return response.status(500).json({ status: 500, message: error.message });
  }
};

const getAllContentTypes = async (request, response) => {
  try {
    const contentTypes = await contentTypeServices.getAllContentTypes();
    return response.status(200).json({
      status: 200,
      data: contentTypes,
      message: 'Succesfully Retrieved Content Types',
    });
  } catch (error) {
    if (error instanceof HTTPError)
      return response
        .status(error.code)
        .json({ status: error.code, message: error.message });
    return response.status(500).json({ status: 500, message: error.message });
  }
};

const addContentTypeFields = async (request, response) => {
  try {
    const contentType = await contentTypeServices.addContentTypeFields(
      request.body.name,
      request.body.fields
    );
    return response.status(200).json({
      status: 200,
      data: contentType,
      message: 'Succesfully Added Content Type Fields',
    });
  } catch (error) {
    if (error instanceof HTTPError)
      return response
        .status(error.code)
        .json({ status: error.code, message: error.message });
    return response.status(500).json({ status: 500, message: error.message });
  }
};

const getCollectionFields = async (request, response) => {
  try {
    const collectionFields = await contentTypeServices.getCollectionFields(
      request.body.collectionName
    );
    return response.status(200).json({
      status: 200,
      data: collectionFields,
      message: 'Succesfully Retrieved Collection Fields',
    });
  } catch (error) {
    console.log('in the catch block');
    if (error instanceof HTTPError)
      return response
        .status(600)
        .json({ status: error.code, message: error.message });
    return response.status(500).json({ status: 500, message: error.message });
  }
};



module.exports = {
  addNewContentType,
  getAllContentTypes,
  addContentTypeFields,
  getCollectionFields
};
