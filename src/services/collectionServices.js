const { getAllDataFromTable } = require('../utils/createTable');
const HTTPError = require('../utils/HTTPError');
const { getColumnNames } = require('../utils/createTable');

const getCollectionData = async (collectionName) => {
  try {
    const collectionData = await getAllDataFromTable(collectionName);
    return collectionData;
  } catch (error) {
    throw new HTTPError(500, error.message);
  }
};

const getCollectionFields = async (collectionName) => {
  try {
    const columnNames = await getColumnNames(collectionName);
    return columnNames;
  } catch (error) {
    throw new HTTPError(500, error.message);
  }
};

module.exports = {
  getCollectionData,
  getCollectionFields,
};
