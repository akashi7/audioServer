const userSchema = require('../model/userModel');


exports.signUpValidation = (req, res, next) => {
  const { username, password } = req.body;

  const { error } = userSchema.signUp.validate({
    username,
    password
  });
  if (error) {
    if (error && error.details[0].type === 'string.pattern.base') {
      res.status(400).send({
        status: 409,
        error: 'Password must be atleast 5 characters long with Capital letter and a number'
      });
    }
    else {
      console.log(error.details[0].message.replace(/[/"]/g, ''));
      res.status(400).send({
        status: 409,
        error: error.details[0].message.replace(/[/"]/g, '')
      });
    }
    console.log("error :>> ", error);
  } else next();
};

exports.loginValidation = (req, res, next) => {
  const { username, password } = req.body;

  const { error } = userSchema.login.validate({
    username,
    password
  });
  if (error) {
    if (error && error.details[0].type === 'string.pattern.base') {
      res.send({
        status: 409,
        error: 'Password must be atleast 5 characters long with Capital letter and a number'
      });
    }
    else {
      console.log(error.details[0].message.replace(/[/"]/g, ''));
      res.send({
        status: 409,
        error: error.details[0].message.replace(/[/"]/g, '')
      });
    }
    console.log("error :>> ", error);
  } else next();
};