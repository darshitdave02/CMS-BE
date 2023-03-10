
const { getColumnNames, addTableEntry, deleteRowFromTable,getAllDataFromTable, updateTableEntry } = require('../utils/dbUtils');

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

const addCollectionData = async (collectionName, data) => {
  try {
    const collectionData = await addTableEntry(collectionName, data);
    return collectionData;
  } catch (error) {
    console.log(500, error.message);
  }
};

const deleteCollectionData = async (collectionName, data) => {
  try {
    const collectionData = await deleteRowFromTable(collectionName, data);
    return collectionData;
  } catch (error) {
    console.log(500, error.message);
  }
};

const updateCollectionData = async (collectionName, id, data) => {
  try {
    const collectionData = await updateTableEntry(collectionName, id, data);
    return collectionData;
  } catch (error) {
    console.log(500, error.message);
  }
};



module.exports = {
  getCollectionData,
  getCollectionFields,
  addCollectionData,
  deleteCollectionData,
  updateCollectionData,
};
