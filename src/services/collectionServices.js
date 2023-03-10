const { getAllDataFromTable } = require('../utils/createTable');
const { getColumnNames } = require('../utils/createTable');

const getCollectionData = async (collectionName) => {
  try {
    const collectionData = await getAllDataFromTable(collectionName);
    return collectionData;
  } catch (error) {
    console.log(500, error.message);
  }
};

const getCollectionFields = async (collectionName) => {
  try {
    const columnNames = await getColumnNames(collectionName);
    return columnNames;
  } catch (error) {
    console.log(500, error.message);
  }
};

module.exports = {
  getCollectionData,
  getCollectionFields,
};
