const Joi = require('joi');

function productCreationValidation(product) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().allow(''),
    code: Joi.string().min(2).max(255).required(),
    quantity: Joi.number().min(0).required(),
  });

  return schema.validate(product);
}

function productUpdateValidation(product) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255),
    description: Joi.string().allow(''),
    code: Joi.string().min(2).max(255),
  });

  return schema.validate(product);
}

function productMovementValidation(productMovement) {
  const schema = Joi.object({
    movementDescription: Joi.string().allow(''),
    entryExitAmount: Joi.number().required(),
  });

  return schema.validate(productMovement);
}

module.exports = { productCreationValidation, productUpdateValidation, productMovementValidation }
