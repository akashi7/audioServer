const { createPool } = require('mysql');
const { config } = require('dotenv');

config();


const db = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
});

module.exports = db;

