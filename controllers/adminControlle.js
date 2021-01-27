const db = require('../config/database');
const cloudinary = require('../config/cloudinary');
const { config } = require('dotenv');
config();




const uploadSong = async (audio) => {
  try {

    if (audio.mimetype === 'audio/mpeg') {
      const music = await cloudinary.uploader.upload(audio.tempFilePath, { resource_type: "video" }, (result) => result);
      console.log('music', music);
      audio = music.url;
      return audio;
    }

  }
  catch (error) {
    console.log('err', error);
  }
};




exports.adminUploadSong = async (req, res) => {
  const { songName, genre, sangBy } = req.body;
  const { audio = '' } = req.files || {};

  const { username } = req.user;

  let Song = await uploadSong(audio);

  if (Song) {
    db.getConnection((err, connection) => {
      if (err) throw err;
      else {
        connection.query("INSERT INTO songs SET?", {
          songName,
          sangBy,
          genre,
          audioUrl: Song,
          username
        }, (err, result) => {
          if (err) throw err;
          else {
            res.send({
              status: 200,
              message: "Song added "
            });
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

exports.adminViewUsers = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    else {
      connection.query("SELECT * FROM users ORDER BY id DESC", (err, result) => {
        if (err) throw err;
        else {
          res.send({
            status: 200,
            data: { Users: result }
          });
        }
        connection.release();
      });
    }
  });
};