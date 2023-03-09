const HTTPError = require('../utils/HTTPError');
const { createTable, addColumnsToTable } = require('../utils/createTable');

const addNewContentType = async (typeName) => {
  try {
    await createTable(typeName.name, typeName.columns);
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
  return [];
};

module.exports = { addNewContentType, addContentTypeFields, getAllContentTypes };
