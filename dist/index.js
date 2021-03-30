"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = require("express");

var _cors = _interopRequireDefault(require("cors"));

var _authRoutes = _interopRequireDefault(require("./routes/authRoutes"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _adminRoutes = _interopRequireDefault(require("./routes/adminRoutes"));

var app = require('express')();

app.get('/', function (req, res) {
  res.send('<h2>Server running ...</h2>');
});
app.use((0, _cors["default"])());
app.use(require('morgan')('dev'));
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: false
}));
app.use('/auth', _authRoutes["default"]);
app.use('/user', _userRoutes["default"]);
app.use('/admin', _adminRoutes["default"]);
var PORT = process.env.PORT || 5000;
process.on("uncaughtException", function (err) {
  console.log("................uncaughtError................", err);
});
process.on("unhandledRejection", function (err) {
  console.log(".....................unhandledError.............", err);
});
app.listen(PORT, function () {
  console.log("Server running on Port ".concat(PORT));
});