import { createPool } from 'mysql';
import { config } from 'dotenv';

config();


const db = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
});

export { db };

