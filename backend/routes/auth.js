const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/user');
const express = require('express');
const validate = require('../middlewares/validate');
const { authValidation } = require('../validations/auth');
const router = express.Router();

router.post('/', validate(authValidation), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ errorMessage: 'Invalid email or password.' });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ errorMessage: 'Invalid email or password.' });

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
