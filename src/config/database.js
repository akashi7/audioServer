const { createPool } = require('mysql');
const { config } = require('dotenv');

config();


const db = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
});

// const db = createPool({
//   host: "localhost",
//   user: "root",
//   database: "musicapp",
//   password: "Akashikabuto7"
// });

module.exports = db;

