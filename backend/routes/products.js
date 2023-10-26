const express = require('express');

const validateObjectId = require('../middlewares/validateObjectId');
const auth = require('../middlewares/auth');
const Product = require('../models/product');
const validate = require('../middlewares/validate');
const {
  productCreationValidation,
  productUpdateValidation,
  productMovementValidation,
} = require('../validations/product');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.get('/:id', [auth, validateObjectId], async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res
      .status(404)
      .send({ errorMessage: 'The product with the given ID was not found.' });

  res.send(product);
});

router.post(
  '/',
  [auth, validate(productCreationValidation)],
  async (req, res) => {
    let product = new Product(req.body);
    product = await product.save();

    res.send(product);
  }
);

router.put(
  '/:id',
  [auth, validateObjectId, validate(productUpdateValidation)],
  async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product)
      return res
        .status(404)
        .send({ errorMessage: 'The product with the given ID was not found.' });

    res.send(product);
  }
);

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product)
    return res
      .status(404)
      .send({ errorMessage: 'The product with the given ID was not found.' });

  res.send(product);
});

router.post(
  '/:id/movements',
  [auth, validateObjectId, validate(productMovementValidation)],
  async (req, res) => {
    let product = await Product.findById(req.params.id);
    const { entryExitAmount } = req.body;

    if (!product)
      return res
        .status(404)
        .send({ errorMessage: 'The product with the given ID was not found.' });

    if (parseInt(entryExitAmount) + product.quantity < 0)
      return res
        .status(404)
        .send({ errorMessage: 'Insufficient stock quantity.' });

    product.movements.push(req.body);
    product.quantity += parseInt(entryExitAmount);

    product = await product.save();

    res.send(product);
  }
);

module.exports = router;
