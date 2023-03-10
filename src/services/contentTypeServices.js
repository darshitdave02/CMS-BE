const { createTable, addColumnsToTable } = require('../utils/createTable');
const {Collection} = require('../models');

const addNewContentType = async (typeName) => {
  try {
    await createTable(typeName.name, typeName.columns);
    await Collection.create({collectionName: typeName.name});
    return { name: typeName };
  } catch (error) {
    console.log(500, error.message);
  }
};

const addContentTypeFields = async (typeName, fields) => {
  try {
    await addColumnsToTable(typeName, fields);
    return { name: typeName };
  } catch (error) {
    console.log(500, error.message);
  }
};

const getAllContentTypes = async () => {
  try {
    const contentTypes = await Collection.findAll();
    return contentTypes;
  } catch (error) {
    console.log(500, error.message);
  }
  
};




module.exports = { addNewContentType, addContentTypeFields, getAllContentTypes };
