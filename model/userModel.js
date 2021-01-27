const joi = require('joi');

const userSchema = {
  signUp: joi.object({
    username: joi.string().trim(),
    password: joi.string().min(5).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/)
  }),
  login: joi.object({
    username: joi.string().trim(),
    password: joi.string().min(5).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/)
  })
};

module.exports = userSchema;