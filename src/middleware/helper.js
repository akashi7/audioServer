import { userSchema } from '../model/userModel';


export function signUpValidation(req, res, next) {
  const { username, password } = req.body;

  const { error } = userSchema.signUp.validate({
    username,
    password
  });
  if (error) {
    res.send({
      status: 409,
      error: error.message
    });
  } else next();
}

export function loginValidation(req, res, next) {
  const { username, password } = req.body;

  const { error } = userSchema.login.validate({
    username,
    password
  });
  if (error) {
    res.send({
      status: 409,
      error: error.message
    });
  } else next();
}