const bcrypt = require('bcrypt');
const _ = require('lodash');
const { userRegistrationValidation } = require('../validations/user');
const User = require('../models/user');

const express = require('express');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/', validate(userRegistrationValidation), async (req, res) => {
  let username = await User.findOne({ username: req.body.username });
  if (username)
    return res.status(400).send({
      errorMessage: 'This username is already taken.',
    });

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .send({ errorMessage: 'This email is already taken.' });

  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'username', 'email']));
});

module.exports = router;
