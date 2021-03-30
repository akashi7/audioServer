import { json, urlencoded } from 'express';

import cors from 'cors';

import auth from './routes/authRoutes';
import user from './routes/userRoutes';
import admin from './routes/adminRoutes';

const app = require('express')();

app.get('/', (req, res) => {
  res.send('<h2>Server running ...</h2>');
});

app.use(cors());
app.use(require('morgan')('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/auth', auth);
app.use('/user', user);
app.use('/admin', admin);

const PORT = process.env.PORT || 5000;


process.on("uncaughtException", (err) => {
  console.log("................uncaughtError................", err);
});

process.on("unhandledRejection", (err) => {
  console.log(".....................unhandledError.............", err);
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});