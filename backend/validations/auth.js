const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const passwordComplexityOptions = require('../constants/passwordComplexityOptions');

function authValidation(identity) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity(passwordComplexityOptions),
  });

  return schema.validate(identity);
}

exports.authValidation = authValidation;
