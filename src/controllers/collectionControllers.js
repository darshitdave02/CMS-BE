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
      request.params.collectionName
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
        .status(600)
        .json({ status: error.code, message: error.message });
    return response.status(500).json({ status: 500, message: error.message });
  }
};

module.exports = {
  getCollectionData,
  getCollectionFields,
};
