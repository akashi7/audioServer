"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _mysql = require("mysql");

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var db = (0, _mysql.createPool)({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
});
exports.db = db;