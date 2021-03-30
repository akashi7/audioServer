import { db } from '../config/database';
import { cloudinary } from '../config/cloudinary';
import { config } from 'dotenv';
config();



const uploadSong = async (audio) => {

  console.log('audio', audio);
  try {

    if (audio.mimetype === "audio/mpeg") {
      const music = await cloudinary.uploader.upload(audio.tempFilePath, { resource_type: "auto" }, (result) => result);
      console.log('music', music);
      audio = music.secure_url;
      return audio;
    }

  }
  catch (error) {
    console.log('err', error);
  }
};




export async function adminUploadSong(req, res) {
  const { songName, genre, sangBy } = req.body;
  const { audio = '' } = req.files || {};


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
}

export function adminViewUsers(req, res) {
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
}