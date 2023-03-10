const collectionServices = require('../services/collectionServices');
const HTTPError = require('../utils/HTTPError');

const getCollectionData = async (req, res) => {
  try {
    const { collectionName } = req.params;
    const collectionData = await collectionServices.getCollectionData(
      collectionName
    );
    res.status(200).json(collectionData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCollectionFields = async (request, response) => {
  try {
    const collectionFields = await collectionServices.getCollectionFields(
      request.params.collectionName.toLowerCase()
    );
    response.send({
      status: 200,
      data: collectionFields,
      message: 'Succesfully Retrieved Collection Fields',
    });
  } catch (error) {
    console.log('in the catch block');
    if (error instanceof HTTPError)
      return response
        .status(500)
        .json({ status: error.code, message: error.message });
    response.status(500).json({ status: 500, message: error.message });
  }
};

const addCollectionData = async (request, response) => {
  try {
    const collectionData = await collectionServices.addCollectionData(
      request.params.collectionName.toLowerCase(),
      request.body
    );
    response.send({
      status: 200,
      data: collectionData,
      message: 'Succesfully Added Collection Data',
    });
  } catch (error) {
    console.log('in the catch block');
    if (error instanceof HTTPError)
      return response
        .status(500)
        .json({ status: error.code, message: error.message });
    response.status(500).json({ status: 500, message: error.message });
  }
};

const deleteCollectionData = async (request, response) => {
  try {
    const collectionData = await collectionServices.deleteCollectionData(
      request.params.collectionName.toLowerCase(),
      request.body.id
    );
    response.send({
      status: 200,
      data: collectionData,
      message: 'Succesfully Deleted Collection Data',
    });
  } catch (error) {
    console.log('in the catch block');
    if (error instanceof HTTPError)
      return response
        .status(500)
        .json({ status: error.code, message: error.message });
    response.status(500).json({ status: 500, message: error.message });
  }
};

const updateCollectionData = async (request, response) => {
  try {
    const collectionData = await collectionServices.updateCollectionData(
      request.params.collectionName.toLowerCase(),
      request.body.id,
      request.body
    );
    response.send({
      status: 200,
      data: collectionData,
      message: 'Succesfully Updated Collection Data',
    });
  } catch (error) {
    console.log('in the catch block');
    if (error instanceof HTTPError)
      return response
        .status(500)
        .json({ status: error.code, message: error.message });
    response.status(500).json({ status: 500, message: error.message });
  }
};


module.exports = {
  getCollectionData,
  getCollectionFields,
  addCollectionData,
  deleteCollectionData,
  updateCollectionData
};
