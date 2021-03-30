"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUpValidation = signUpValidation;
exports.loginValidation = loginValidation;

var _userModel = require("../model/userModel");

function signUpValidation(req, res, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  var _userSchema$signUp$va = _userModel.userSchema.signUp.validate({
    username: username,
    password: password
  }),
      error = _userSchema$signUp$va.error;

  if (error) {
    res.send({
      status: 409,
      error: error.message
    });
  } else next();
}

function loginValidation(req, res, next) {
  var _req$body2 = req.body,
      username = _req$body2.username,
      password = _req$body2.password;

  var _userSchema$login$val = _userModel.userSchema.login.validate({
    username: username,
    password: password
  }),
      error = _userSchema$login$val.error;

  if (error) {
    res.send({
      status: 409,
      error: error.message
    });
  } else next();
}