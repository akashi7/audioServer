"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requiredLogin = requiredLogin;

var _jsonwebtoken = require("jsonwebtoken");

var _dotenv = require("dotenv");

(0, _dotenv.config)();

function requiredLogin(req, res, next) {
  var token = req.headers.authorization.replace("Bearer ", "");
  (0, _jsonwebtoken.verify)(token, "".concat(process.env.JWT_SECRET), function (err, decoded) {
    if (err) {
      res.status(401).send({
        status: 401,
        message: 'please login first'
      });
    } else {
      req.user = decoded;

      if (decoded.isadmin === '1') {
        next();
      } else {
        res.status(401).send({
          status: 401,
          message: 'You must be Admin'
        });
      }
    }
  });
}