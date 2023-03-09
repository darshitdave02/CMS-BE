const HTTPError = require('../utils/HTTPError');
const { createTable, addColumnsToTable, getColumnNames } = require('../utils/createTable');
const {Collection} = require('../models');

const addNewContentType = async (typeName) => {
  try {
    await createTable(typeName.name, typeName.columns);
    await Collection.create({collectionName: typeName.name});
    return { name: typeName };
  } catch (error) {
    throw new HTTPError(500, error.message);
  }
};

const addContentTypeFields = async (typeName, fields) => {
  try {
    await addColumnsToTable(typeName, fields);
    return { name: typeName };
  } catch (error) {
    throw new HTTPError(500, error.message);
  }
};

const getAllContentTypes = async () => {
  try {
    const contentTypes = await Collection.findAll();
    return contentTypes;
  } catch (error) {
    throw new HTTPError(500, error.message);
  }
  
};

//use get
const getCollectionFields = async (collectionName) => {
  try {
    const columnNames = await getColumnNames(collectionName);
    return columnNames;
  } catch (error) {
    throw new HTTPError(500, error.message);
  }
};

module.exports = { addNewContentType, addContentTypeFields, getAllContentTypes, getCollectionFields };
