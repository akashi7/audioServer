const joi = require('joi');

const userSchema = {
  signUp: joi.object({
    username: joi.string().trim().max(10).required().error(new Error('Username required,Not greater than 10')),
    password: joi.string().min(5).max(100).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).required().error(new Error(
      'Password must be atleast 5 characters long with Capital letter and a number'
    ))
  }),
  login: joi.object({
    username: joi.string().trim().max(100).required().error(new Error('Username required,Not greater than 10')),
    password: joi.string().min(5).max(100).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).required().error(new Error(
      'Password must be atleast 5 characters long with Capital letter and a number'
    ))
  })
};

module.exports = userSchema;