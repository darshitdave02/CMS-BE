const { createTable, addColumnsToTable, renameTable, renameColumn, deleteColumn } = require('../utils/dbUtils');
const { Collection } = require('../models');

const addNewContentType = async (typeName) => {
  try {
    await createTable(typeName.name, typeName.columns);
    await Collection.create({ collectionName: typeName.name });
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

const renameContentType = async (oldName, newName) => {
  try {
    await renameTable(oldName, newName);
    const response = await Collection.findAll({ where: { collectionName: oldName } });
    console.log(response[0].dataValues.id);
    await Collection.update({ collectionName: newName }, { where: {id: response[0].dataValues.id} });
    // await collection.update({ collectionName: typeName });
    // await collection.save();
    return { name: newName };
  } catch (error) {
    console.log(500, error.message);
  }
};

const renameContentTypeField = async (typeName, oldName, newName) => {
  try {
    await renameColumn(typeName, oldName, newName);
    return { name: newName };
  } catch (error) {
    console.log(500, error.message);
  }
};

const deleteContentTypeField = async (typeName, fieldName) => {
  try {
    await deleteColumn(typeName, fieldName);
    return { name: fieldName };
  } catch (error) {
    console.log(500, error.message);
  }
};
  



module.exports = {
  addNewContentType,
  addContentTypeFields,
  getAllContentTypes,
  renameContentType,
  renameContentTypeField,
  deleteContentTypeField
};
