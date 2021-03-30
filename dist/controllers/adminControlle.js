"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminUploadSong = adminUploadSong;
exports.adminViewUsers = adminViewUsers;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = require("../config/database");

var _cloudinary = require("../config/cloudinary");

var _dotenv = require("dotenv");

(0, _dotenv.config)();

var uploadSong = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(audio) {
    var music;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('audio', audio);
            _context.prev = 1;

            if (!(audio.mimetype === "audio/mpeg")) {
              _context.next = 9;
              break;
            }

            _context.next = 5;
            return _cloudinary.cloudinary.uploader.upload(audio.tempFilePath, {
              resource_type: "auto"
            }, function (result) {
              return result;
            });

          case 5:
            music = _context.sent;
            console.log('music', music);
            audio = music.secure_url;
            return _context.abrupt("return", audio);

          case 9:
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);
            console.log('err', _context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 11]]);
  }));

  return function uploadSong(_x) {
    return _ref.apply(this, arguments);
  };
}();

function adminUploadSong(_x2, _x3) {
  return _adminUploadSong.apply(this, arguments);
}

function _adminUploadSong() {
  _adminUploadSong = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, songName, genre, sangBy, _ref2, _ref2$audio, audio, Song;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, songName = _req$body.songName, genre = _req$body.genre, sangBy = _req$body.sangBy;
            _ref2 = req.files || {}, _ref2$audio = _ref2.audio, audio = _ref2$audio === void 0 ? '' : _ref2$audio;
            _context2.next = 4;
            return uploadSong(audio);

          case 4:
            Song = _context2.sent;

            if (Song) {
              _database.db.getConnection(function (err, connection) {
                if (err) throw err;else {
                  connection.query("INSERT INTO songs SET?", {
                    songName: songName,
                    sangBy: sangBy,
                    genre: genre,
                    audioUrl: Song
                  }, function (err, result) {
                    if (err) throw err;else {
                      res.send({
                        status: 200,
                        message: "Song added "
                      });
                    }
                    connection.release();
                  });
                }
              });
            } else {
              res.send({
                status: 300,
                message: "Error Uploading file due to wrong File extension Or have internet Error"
              });
            }

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _adminUploadSong.apply(this, arguments);
}

function adminViewUsers(req, res) {
  _database.db.getConnection(function (err, connection) {
    if (err) throw err;else {
      connection.query("SELECT * FROM users ORDER BY id DESC", function (err, result) {
        if (err) throw err;else {
          res.send({
            status: 200,
            data: {
              Users: result
            }
          });
        }
        connection.release();
      });
    }
  });
}