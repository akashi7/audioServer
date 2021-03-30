import { db } from '../config/database';

export function userCreatePlaylist(req, res) {

  const { playListName } = req.query;
  const { username } = req.user;

  db.getConnection((err, connection) => {
    if (err) throw err;
    else {
      connection.query("INSERT INTO playlist SET?", {
        playListName,
        username
      }, (err, result) => {
        if (err) throw err;
        else {
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

export function addSongToPlayList(req, res) {

  const { playListId, songId } = req.query;

  db.getConnection((err, connection) => {
    if (err) throw err;
    else {
      connection.query("SELECT * FROM songs WHERE id=?", [songId], (err, result) => {
        if (err) throw err;
        else {
          const { songName } = result[0];
          connection.query("INSERT INTO playlistsongs SET?", {
            playListId,
            song: songName,
            songId
          }, (err, results) => {
            if (err) throw err;
            else {
              res.send({
                status: 200,
                message: `${songName} added to ${playListId}`
              });
            }
            connection.release();
          });
        }
      });
    }
  });
}

export function deletePlayList(req, res) {
  const { playListId } = req.query;
  db.getConnection((err, connection) => {
    if (err) throw err;
    else {
      connection.query("DELETE FROM playlist WHERE id=?", [playListId], (err, result) => {
        if (err) throw err;
        else {
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

export function userSearchSong(req, res) {
  const { songName } = req.query;
  db.getConnection((err, connection) => {
    if (err) throw err;
    else {
      connection.query("SELECT * FROM songs WHERE songName LIKE N? ", [`%${songName}%`], (err, result) => {
        if (err) throw err;
        else if (result.length === 0) {
          console.log('songs', result);
          res.send({
            status: 205,
            message: "Song not Found"
          });
        }
        else {
          console.log('songs', result);
          res.send({
            status: 200,
            data: { songs: result }
          });
        }
        connection.release();
      });
    }
  });
}

export function userViewSong(req, res) {
  const { songId } = req.query;

  db.getConnection((err, connection) => {
    if (err) throw err;
    else {
      connection.query("SELECT * FROM songs WHERE id=?", [songId], (err, result) => {
        if (err) throw err;
        else {
          const { songName } = result[0];
          res.send({
            status: 200,
            data: { songName: result },
            songName
          });
        }
        connection.release();

      });
    }

  });

}

export function userViewAllSongs(req, res) {
  db.getConnection((err, connection) => {
    if (err) throw err;
    else {
      connection.query("SELECT * FROM songs ORDER BY id DESC", (err, result) => {
        if (err) throw err;
        else {
          res.send({
            status: 200,
            data: { songs: result }
          });
        }
        connection.release();
      });
    }
  });
}

export function viewProfile(req, res) {
  const { id } = req.user;
  db.getConnection((err, connection) => {
    if (err) throw err;
    else {
      connection.query("SELECT * FROM users WHERE id=?", [id], (err, result) => {
        if (err) throw err;
        else {
          res.send({
            status: 200,
            data: { user: result }
          });
        }
        connection.release();
      });
    }
  });
}