"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "cloudinary", {
  enumerable: true,
  get: function get() {
    return _cloudinary.v2;
  }
});

var _cloudinary = require("cloudinary");

var _dotenv = require("dotenv");

(0, _dotenv.config)();

_cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});