"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userControlle = require("../controllers/userControlle");

var _isLoggedIn = require("../middleware/isLoggedIn");

var router = (0, _express.Router)();
router.post('/createPlayList', _isLoggedIn.requiredLogin, _userControlle.userCreatePlaylist);
router.post('/addSongToPlayList', _isLoggedIn.requiredLogin, _userControlle.addSongToPlayList);
router["delete"]('/deletePlayList', _isLoggedIn.requiredLogin, _userControlle.deletePlayList);
router.get('/searchSong', _isLoggedIn.requiredLogin, _userControlle.userSearchSong);
router.get('/viewSong', _isLoggedIn.requiredLogin, _userControlle.userViewSong);
router.get('/allSongs', _isLoggedIn.requiredLogin, _userControlle.userViewAllSongs);
router.get('/viewProfile', _isLoggedIn.requiredLogin, _userControlle.viewProfile);
var _default = router;
exports["default"] = _default;