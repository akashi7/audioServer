"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userCreatePlaylist = userCreatePlaylist;
exports.addSongToPlayList = addSongToPlayList;
exports.deletePlayList = deletePlayList;
exports.userSearchSong = userSearchSong;
exports.userViewSong = userViewSong;
exports.userViewAllSongs = userViewAllSongs;
exports.viewProfile = viewProfile;

var _database = require("../config/database");

function userCreatePlaylist(req, res) {
  var playListName = req.query.playListName;
  var username = req.user.username;

  _database.db.getConnection(function (err, connection) {
    if (err) throw err;else {
      connection.query("INSERT INTO playlist SET?", {
        playListName: playListName,
        username: username
      }, function (err, result) {
        if (err) throw err;else {
          res.send({
            status: 200,
            message: "PlayList created !"
          });
        }
        connection.release();
      });
    }
  });
}

function addSongToPlayList(req, res) {
  var _req$query = req.query,
      playListId = _req$query.playListId,
      songId = _req$query.songId;

  _database.db.getConnection(function (err, connection) {
    if (err) throw err;else {
      connection.query("SELECT * FROM songs WHERE id=?", [songId], function (err, result) {
        if (err) throw err;else {
          var songName = result[0].songName;
          connection.query("INSERT INTO playlistsongs SET?", {
            playListId: playListId,
            song: songName,
            songId: songId
          }, function (err, results) {
            if (err) throw err;else {
              res.send({
                status: 200,
                message: "".concat(songName, " added to ").concat(playListId)
              });
            }
            connection.release();
          });
        }
      });
    }
  });
}

function deletePlayList(req, res) {
  var playListId = req.query.playListId;

  _database.db.getConnection(function (err, connection) {
    if (err) throw err;else {
      connection.query("DELETE FROM playlist WHERE id=?", [playListId], function (err, result) {
        if (err) throw err;else {
          res.send({
            status: 200,
            message: "PlayList deleted !!"
          });
        }
        connection.release();
      });
    }
  });
}

function userSearchSong(req, res) {
  var songName = req.query.songName;

  _database.db.getConnection(function (err, connection) {
    if (err) throw err;else {
      connection.query("SELECT * FROM songs WHERE songName LIKE N? ", ["%".concat(songName, "%")], function (err, result) {
        if (err) throw err;else if (result.length === 0) {
          console.log('songs', result);
          res.send({
            status: 205,
            message: "Song not Found"
          });
        } else {
          console.log('songs', result);
          res.send({
            status: 200,
            data: {
              songs: result
            }
          });
        }
        connection.release();
      });
    }
  });
}

function userViewSong(req, res) {
  var songId = req.query.songId;

  _database.db.getConnection(function (err, connection) {
    if (err) throw err;else {
      connection.query("SELECT * FROM songs WHERE id=?", [songId], function (err, result) {
        if (err) throw err;else {
          var songName = result[0].songName;
          res.send({
            status: 200,
            data: {
              songName: result
            },
            songName: songName
          });
        }
        connection.release();
      });
    }
  });
}

function userViewAllSongs(req, res) {
  _database.db.getConnection(function (err, connection) {
    if (err) throw err;else {
      connection.query("SELECT * FROM songs ORDER BY id DESC", function (err, result) {
        if (err) throw err;else {
          res.send({
            status: 200,
            data: {
              songs: result
            }
          });
        }
        connection.release();
      });
    }
  });
}

function viewProfile(req, res) {
  var id = req.user.id;

  _database.db.getConnection(function (err, connection) {
    if (err) throw err;else {
      connection.query("SELECT * FROM users WHERE id=?", [id], function (err, result) {
        if (err) throw err;else {
          res.send({
            status: 200,
            data: {
              user: result
            }
          });
        }
        connection.release();
      });
    }
  });
}