const mongoose = require('mongoose');
const config = require('config');
var winston = require('winston');

module.exports = function () {
  const db = config.get('db');
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info(`Connected to ${db}...`));
};
