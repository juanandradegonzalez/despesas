
// db.js
const { Pool } = require('pg');  // Importando a biblioteca para PostgreSQL
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,  // Porta padrão do PostgreSQL
});

module.exports = pool;
