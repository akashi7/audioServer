"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var userSchema = {
  signUp: _joi["default"].object({
    username: _joi["default"].string().trim().max(100).required().error(new Error('Username required')),
    password: _joi["default"].string().min(5).max(100).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).required().error(new Error('Password must be atleast 5 characters long with Capital letter and a number'))
  }),
  login: _joi["default"].object({
    username: _joi["default"].string().trim().max(100).required().error(new Error('Username required')),
    password: _joi["default"].string().min(5).max(100).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).required().error(new Error('Password must be atleast 5 characters long with Capital letter and a number'))
  })
};
exports.userSchema = userSchema;