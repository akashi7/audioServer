const db = require('../config/database');
const { hash, compare } = require('bcryptjs');

const { sign } = require('jsonwebtoken');

exports.userSignUp = (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.send({
      status: 302,
      message: "passwords do not match !!!"
    });
  }
  else {
    db.getConnection((err, connection) => {
      if (err) throw err;
      else {
        connection.query("SELECT * FROM users WHERE username=?", [username], async (err, result) => {
          if (err) throw err;
          else if (result.length > 0) {
            res.send({
              status: 204,
              message: "Username Already Exists !!"
            });
          }
          else {
            let hashedPassword = await hash(password, 8);
            db.getConnection((err, connection) => {
              if (err) throw err;
              else {
                connection.query("INSERT INTO users SET?", {
                  username,
                  password: hashedPassword
                }, (err, resultss) => {
                  if (err) throw err;
                  else {
                    connection.query("SELECT * FROM users WHERE username=?", [username], (err, results) => {
                      if (err) throw err;
                      else {
                        const { username, id, isadmin } = results[0];
                        const token = sign({ username, id, isadmin }, process.env.JWT_SECRET, { expiresIn: '2h' });
                        res.send({
                          status: 200,
                          token,
                          message: `${username} created Succesfully`,
                          username
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
};


exports.userLogin = (req, res) => {
  const { username, password } = req.body;

  db.getConnection((err, connection) => {
    if (err) throw err;
    else {
      connection.query("SELECT * FROM users WHERE username=?", [username], async (err, result) => {
        if (err) throw err;
        else if (result.length < 1) {
          res.send({
            status: 204,
            message: "User don't Exist"
          });
        }
        else {
          if (!(await compare(password, result[0].password))) {
            res.send({
              status: 300,
              message: "Wrong Password"
            });
          }
          else {
            if (username === 'admin') {
              const { username, id, isadmin } = result[0];
              const token = sign({ username, id, isadmin }, process.env.JWT_SECRET, { expiresIn: '2h' });
              res.send({
                status: 700,
                token,
                message: `${username} logged in`,
                username
              });
            }
            else {
              const { username, id, isadmin } = result[0];
              const token = sign({ username, id, isadmin }, process.env.JWT_SECRET, { expiresIn: '2h' });

              res.send({
                status: 200,
                token,
                message: `${username} logged in`,
                username
              });
            }
            connection.release();

          }

        }
      });
    }
  });


};