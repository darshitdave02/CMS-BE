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

const renameContentType = async (request, response) => {
  try {
    const contentType = await contentTypeServices.renameContentType(
      request.body.name,
      request.body.newName
    );
    return response.status(200).json({
      status: 200,
      data: contentType,
      message: 'Succesfully Renamed Content Type',
    });
  } catch (error) {
    if (error instanceof HTTPError)
      return response
        .status(error.code)
        .json({ status: error.code, message: error.message });
    return response.status(500).json({ status: 500, message: error.message });
  }
};

const renameField = async (request, response) => {
  try {
    const contentType = await contentTypeServices.renameContentTypeField(
      request.body.name.toLowerCase(),
      request.body.fieldName,
      request.body.newFieldName
    );
    return response.status(200).json({
      status: 200,
      data: contentType,
      message: 'Succesfully Renamed Field',
    });
  } catch (error) {
    if (error instanceof HTTPError)
      return response
        .status(error.code)
        .json({ status: error.code, message: error.message });
    return response.status(500).json({ status: 500, message: error.message });
  }
};

const deleteField = async (request, response) => {
  try {
    const contentType = await contentTypeServices.deleteContentTypeField(
      request.body.name.toLowerCase(),
      request.body.fieldName
    );
    return response.status(200).json({
      status: 200,
      data: contentType,
      message: 'Succesfully Deleted Field',
    });
  } catch (error) {
    if (error instanceof HTTPError)
      return response
        .status(error.code)
        .json({ status: error.code, message: error.message });
    return response.status(500).json({ status: 500, message: error.message });
  }
};

module.exports = {
  addNewContentType,
  getAllContentTypes,
  addContentTypeFields,
  renameContentType,
  renameField,
  deleteField,
};
