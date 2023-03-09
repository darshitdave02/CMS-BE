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
    const query = `ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS ${fields.map(field => `"${field}" TEXT`).join(', ADD COLUMN IF NOT EXISTS ')}`;
    const result = await pool.query(query);
    console.log(`Columns added to table ${tableName}`);
  } catch (error) {
    console.error(`Error adding columns to ${tableName}: ${error}`);
  }
}






module.exports = { createTable, addColumnsToTable };
