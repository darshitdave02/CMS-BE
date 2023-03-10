require('dotenv').config(); // load environment variables from .env file
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const createTable = async (tableName, columns) => {
  const query = `
    CREATE TABLE ${tableName} (
      ${Object.entries(columns)
        .map(([columnName, columnType]) => `${columnName} ${columnType}`)
        .join(',\n')}
    )
  `;

  const client = await pool.connect();
  try {
    await client.query(query);
    console.log(
      `Table ${tableName} created successfully in ${process.env.DB_NAME}`
    );
  } catch (err) {
    console.error(
      `Error creating table ${tableName} in ${process.env.DB_NAME}: ${err.message}`
    );
  }
};

async function addColumnsToTable(tableName, fields) {
  try {
    const query = `ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS ${fields
      .map((field) => `"${field}" TEXT`)
      .join(', ADD COLUMN IF NOT EXISTS ')}`;
    const result = await pool.query(query);
    console.log(`Columns added to table ${tableName}`);
  } catch (error) {
    console.error(`Error adding columns to ${tableName}: ${error}`);
  }
}

const getColumnNames = async (tableName) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name = '${tableName}'`
    );
    const columnNames = await result.rows.map((row) => row.column_name);
    return columnNames;
  } finally {
    client.release();
  }
};

const getAllDataFromTable = async (tableName) => {
  const client = await pool.connect();

  try {
    const query = `SELECT * FROM ${tableName}`;
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
};

const addTableEntry = async (tableName, obj) => {
  try {
    const columns = Object.keys(obj);
    const query = {
      text: `INSERT INTO ${tableName} (${columns.map(col => `"${col}"`).join(', ')}) VALUES (${columns.map((_, i) => `$${i+1}`).join(', ')})`,
      values: Object.values(obj),
    };
    const result = await pool.query(query);
    console.log(`Successfully added ${JSON.stringify(obj)} to ${tableName}.`);
  } catch (error) {
    console.error(`Error adding ${JSON.stringify(obj)} to ${tableName}: ${error}`);
  }
};

module.exports = {
  createTable,
  addColumnsToTable,
  getColumnNames,
  getAllDataFromTable,
  addTableEntry,
};
