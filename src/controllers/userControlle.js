const db = require('../config/database');
const cloudinary = require('../config/cloudinary');

const uploadPic = async (profilepic) => {
  try {
    if (profilepic.mimetype === 'image/jpeg' || profilepic.mimetype === 'image/png') {
      const image = await cloudinary.uploader.upload(profilepic.tempFilePath, (results) => results);
      profilepic = image.secure_url;
      return profilepic;
    }

  } catch (err) {
    profilepic = 'err';
    console.log('err', err);
  }

};

const uploadSong = async (audio) => {

  try {

    if (audio.mimetype === "audio/mpeg") {
      const music = await cloudinary.uploader.upload(audio.tempFilePath, { resource_type: "auto" }, (result) => result);
      audio = music.secure_url;
      return audio;
    }

  }
  catch (error) {
    console.log('err', error);
  }
};



exports.userCreatePlaylist = (req, res) => {

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

};

exports.addSongToPlayList = (req, res) => {

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
};

exports.deletePlayList = (req, res) => {
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
};

exports.userSearchSong = (req, res) => {
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
};

exports.userViewSong = (req, res) => {
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

};

exports.userViewAllSongs = (req, res) => {
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
};

exports.viewProfile = (req, res) => {
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
};

exports.UpdatePic = async (req, res) => {

  const { profilePic } = req.files || {};

  const { username } = req.user;

  let newProfile = await uploadPic(profilePic);


  if (newProfile) {
    db.getConnection((err, connection) => {
      if (err) console.log("connectionError", err);
      else {
        connection.query("UPDATE users SET pic=? WHERE username=? ", [newProfile, username], (err, result) => {
          if (err) console.log("Error", err);
          else {
            res.send(({ status: 200 }));
          }
          connection.release();
        });
      }
    });
  }
  else {
    res.send({
      status: 300,
      message: "Error Uploading file due to wrong File extension Or have internet Error"
    });
  }

};


exports.allSearchSongs = (req, res) => {

  db.getConnection((err, connection) => {
    if (err) console.log("connectionError", err);
    else {
      connection.query("SELECT id,songName,sangBy FROM songs", (err, result) => {
        if (err) console.log("Error", err);
        else {
          res.send({
            status: 200,
            data: result
          });
        }
        connection.release();
      });
    }
  });

};

exports.UserUploadSong = async (req, res) => {
  const { username } = req.user;
  const { songName, genre, sangBy } = req.body;
  const { audio = '' } = req.files || {};
  let newUploads, oldUpload;

  let newSongName = songName.replace(/\s+/g, '');
  let newUsername = username.replace(/\s+/g, '');

  const songFile = await uploadSong(audio);

  if (songFile) {
    db.getConnection((err, connection) => {
      if (err) console.log("connectionError", err);
      else {
        connection.query("SELECT * FROM songs WHERE songName LIKE N?", [`${newSongName}`], (err, resultz) => {
          if (err) console.log("Error", err);
          else if (resultz.length > 0) {
            res.send({ status: 208, message: "Song already Exist" });
          }
          else {
            connection.query("INSERT INTO songs SET?", {
              songName,
              genre,
              sangBy,
              uploader: username,
              audioUrl: songFile

            }, (err, result) => {
              if (err) console.log("Error", err);
              else {
                connection.query("SELECT * FROM users WHERE username LIKE N?", [`${newUsername}`], (err, results) => {
                  if (err) console.log("Error", err);
                  else {
                    const { uploads } = results[0];
                    uploads === null ? oldUpload = 0 : oldUpload = uploads;
                    newUploads = parseInt(oldUpload) + 1;
                    connection.query("UPDATE users SET uploads = ? WHERE username=?", [newUploads, results[0].username], (err, resultss) => {
                      if (err) console.log("Error", err);
                      else {
                        res.send({
                          status: 200
                        });
                      }
                      connection.release();
                    });
                  }
                });
              }
            });
          }
        });
      }


    });
  }
  else {
    res.send({
      status: 300,
      message: "Error Uploading files due to wrong Files extensions Or have internet Error"
    });
  }

};

exports.userSongs = (req, res) => {
  const { username } = req.user;
  let newUsername = username.replace(/\s+/g, '');
  db.getConnection((err, connection) => {
    if (err) console.log("connectionError", err);
    else {
      connection.query("SELECT * FROM songs WHERE uploader LIKE N? ", [`${newUsername}`], (err, result) => {
        if (err) console.log("Error", err);
        else {
          res.send({
            status: 200,
            data: { Yoursongs: result }
          });
        }
        connection.release();
      });
    }
  });
};

exports.viewSong = (req, res) => {
  const { songId } = req.query;
  let Plays, oldPlays;
  let q = 0;

  db.getConnection((err, connection) => {
    if (err) console.log("connectionError", err);
    else {
      connection.query("SELECT * FROM songs WHERE id=?", [songId], (err, result) => {
        if (err) console.log("Error", err);
        else {
          const { plays } = result[0];
          console.log('p', plays);
          plays === null ? oldPlays = q : oldPlays = plays;
          console.log('ffff', oldPlays);
          Plays = parseInt(oldPlays) + 1;
          connection.query("UPDATE songs SET plays=? WHERE id=?", [Plays, songId], (err, results) => {

            if (err) console.log("Error", err);
            else {
              res.send({ status: 200 });
            }
            connection.release();
          });
        }
      });
    }
  });
};

exports.numberOfPlays = (req, res) => {

  db.getConnection((err, connection) => {
    if (err) console.log("connectionError", err);
    else {
      connection.query("SELECT * FROM songs GROUP BY plays ORDER BY plays DESC LIMIT 3 ", (err, result) => {
        if (err) console.log("Error", err);
        else {
          res.send({
            status: 200,
            data: { plays: result }
          });
        }
        connection.release();
      });
    }
  });
};

