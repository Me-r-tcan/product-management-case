const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const passwordComplexityOptions = require('../constants/passwordComplexityOptions');

function userRegistrationValidation(user) {
	const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity(passwordComplexityOptions),
  });

  return schema.validate(user);
}

exports.userRegistrationValidation = userRegistrationValidation;
