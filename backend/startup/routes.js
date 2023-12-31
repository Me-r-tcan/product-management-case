const express = require('express');
const cors = require('cors');
const auth = require('../routes/auth');
const users = require('../routes/users');
const products = require('../routes/products');
const error = require('../middlewares/error');

module.exports = function (app) {
	app.use(cors());
	app.use(express.json());
	app.use('/api/users', users);
	app.use('/api/auth', auth);
	app.use('/api/products', products);

	app.use(error);
};