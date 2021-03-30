"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSignUp = userSignUp;
exports.userLogin = userLogin;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = require("../config/database");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

function userSignUp(req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password,
      confirmPassword = _req$body.confirmPassword;

  if (password !== confirmPassword) {
    res.send({
      status: 302,
      message: "passwords do not match !!!"
    });
  } else {
    _database.db.getConnection(function (err, connection) {
      if (err) throw err;else {
        connection.query("SELECT * FROM users WHERE username=?", [username], /*#__PURE__*/function () {
          var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, result) {
            var hashedPassword;
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!err) {
                      _context.next = 4;
                      break;
                    }

                    throw err;

                  case 4:
                    if (!(result.length > 0)) {
                      _context.next = 8;
                      break;
                    }

                    res.send({
                      status: 204,
                      message: "Username Already Exists !!"
                    });
                    _context.next = 12;
                    break;

                  case 8:
                    _context.next = 10;
                    return (0, _bcryptjs.hash)(password, 8);

                  case 10:
                    hashedPassword = _context.sent;

                    _database.db.getConnection(function (err, connection) {
                      if (err) throw err;else {
                        connection.query("INSERT INTO users SET?", {
                          username: username,
                          password: hashedPassword
                        }, function (err, resultss) {
                          if (err) throw err;else {
                            connection.query("SELECT * FROM users WHERE username=?", [username], function (err, results) {
                              if (err) throw err;else {
                                var _results$ = results[0],
                                    _username = _results$.username,
                                    id = _results$.id,
                                    isadmin = _results$.isadmin;
                                var token = (0, _jsonwebtoken.sign)({
                                  username: _username,
                                  id: id,
                                  isadmin: isadmin
                                }, process.env.JWT_SECRET, {
                                  expiresIn: '2h'
                                });
                                res.send({
                                  status: 200,
                                  token: token,
                                  message: "".concat(_username, " created Succesfully"),
                                  username: _username
                                });
                              }
                              connection.release();
                            });
                          }
                        });
                      }
                    });

                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }());
      }
    });
  }
}

function userLogin(req, res) {
  var _req$body2 = req.body,
      username = _req$body2.username,
      password = _req$body2.password;

  _database.db.getConnection(function (err, connection) {
    if (err) throw err;else {
      connection.query("SELECT * FROM users WHERE username=?", [username], /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err, result) {
          var _result$, _username2, id, isadmin, token, _result$2, _username3, _id, _isadmin, _token;

          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!err) {
                    _context2.next = 4;
                    break;
                  }

                  throw err;

                case 4:
                  if (!(result.length < 1)) {
                    _context2.next = 8;
                    break;
                  }

                  res.send({
                    status: 204,
                    message: "User don't Exist"
                  });
                  _context2.next = 16;
                  break;

                case 8:
                  _context2.next = 10;
                  return (0, _bcryptjs.compare)(password, result[0].password);

                case 10:
                  if (_context2.sent) {
                    _context2.next = 14;
                    break;
                  }

                  res.send({
                    status: 300,
                    message: "Wrong Password"
                  });
                  _context2.next = 16;
                  break;

                case 14:
                  if (username === 'admin') {
                    _result$ = result[0], _username2 = _result$.username, id = _result$.id, isadmin = _result$.isadmin;
                    token = (0, _jsonwebtoken.sign)({
                      username: _username2,
                      id: id,
                      isadmin: isadmin
                    }, process.env.JWT_SECRET, {
                      expiresIn: '2h'
                    });
                    res.send({
                      status: 700,
                      token: token,
                      message: "".concat(_username2, " logged in"),
                      username: _username2
                    });
                  } else {
                    _result$2 = result[0], _username3 = _result$2.username, _id = _result$2.id, _isadmin = _result$2.isadmin;
                    _token = (0, _jsonwebtoken.sign)({
                      username: _username3,
                      id: _id,
                      isadmin: _isadmin
                    }, process.env.JWT_SECRET, {
                      expiresIn: '2h'
                    });
                    res.send({
                      status: 200,
                      token: _token,
                      message: "".concat(_username3, " logged in"),
                      username: _username3
                    });
                  }

                  connection.release();

                case 16:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  });
}