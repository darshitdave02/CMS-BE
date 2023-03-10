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
      text: `INSERT INTO ${tableName} (${columns
        .map((col) => `"${col}"`)
        .join(', ')}) VALUES (${columns
        .map((_, i) => `$${i + 1}`)
        .join(', ')})`,
      values: Object.values(obj),
    };
    const result = await pool.query(query);
    console.log(`Successfully added ${JSON.stringify(obj)} to ${tableName}.`);
  } catch (error) {
    console.error(
      `Error adding ${JSON.stringify(obj)} to ${tableName}: ${error}`
    );
  }
};

const renameTable = async (oldName, newName) => {
  const query = `ALTER TABLE ${oldName} RENAME TO ${newName};`;

  try {
    const client = await pool.connect();
    await client.query(query);
    console.log('Table renamed successfully');
    client.release();
  } catch (err) {
    console.error('Error renaming table:', err);
  }
};

const renameColumn = async (tableName, oldColumnName, newColumnName) => {
  const client = await pool.connect();

  try {
    await client.query(
      `ALTER TABLE "${tableName}" RENAME COLUMN "${oldColumnName}" TO "${newColumnName}";`
    );
    console.log(
      `Column "${oldColumnName}" in table "${tableName}" was successfully renamed to "${newColumnName}".`
    );
  } catch (err) {
    console.error(`Error renaming column: ${err}`);
  } finally {
    client.release();
  }
};

async function deleteColumn(tableName, columnName) {
  const client = await pool.connect();

  try {
    await client.query(
      `ALTER TABLE "${tableName}" DROP COLUMN "${columnName}";`
    );
    console.log(
      `Column "${columnName}" was successfully deleted from table "${tableName}".`
    );
  } catch (err) {
    console.error(`Error deleting column: ${err}`);
  } finally {
    client.release();
  }
}

async function deleteRowFromTable(tableName, id) {
  try {
    const client = await pool.connect();

    const query = {
      text: `DELETE FROM ${tableName} WHERE id=$1`,
      values: [id],
    };

    const result = await client.query(query);
    console.log(`Deleted ${result.rowCount} row(s) from ${tableName}`);

    client.release();
  } catch (err) {
    console.error(`Error deleting from ${tableName}: ${err}`);
  }
}

const updateTableEntry = async (tableName, id, updatedValues) => {
  const keys = Object.keys(updatedValues);
  const values = Object.values(updatedValues);

  const setClause = keys.map((key, i) => `"${key}" = $${i + 2}`).join(', ');

  const query = `
    UPDATE ${tableName}
    SET ${setClause}
    WHERE id = $1
    RETURNING *;
  `;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(query, [id, ...values]);
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  createTable,
  addColumnsToTable,
  getColumnNames,
  getAllDataFromTable,
  addTableEntry,
  renameTable,
  renameColumn,
  deleteColumn,
  deleteRowFromTable,
  updateTableEntry,
};
