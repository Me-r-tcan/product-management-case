var logger = require('winston');

module.exports = function (err, req, res, next) {
  logger.error(err.message, err);

  res.status(500).send({ errorMessage: 'Something failed.' });
};
