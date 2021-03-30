"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authControlle = require("../controllers/authControlle");

var _helper = require("../middleware/helper");

var router = (0, _express.Router)();
router.post('/signUp', _helper.signUpValidation, _authControlle.userSignUp);
router.post('/Login', _helper.loginValidation, _authControlle.userLogin);
var _default = router;
exports["default"] = _default;