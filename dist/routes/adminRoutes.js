"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _adminControlle = require("../controllers/adminControlle");

var _isAdmin = require("../middleware/isAdmin");

var router = (0, _express.Router)();
router.use((0, _expressFileupload["default"])({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  debug: true,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  abortOnLimit: true,
  responseOnLimit: 'File too large'
}));
router.post('/uploadSong', _isAdmin.requiredLogin, _adminControlle.adminUploadSong);
router.get('/all', _isAdmin.requiredLogin, _adminControlle.adminViewUsers);
var _default = router;
exports["default"] = _default;