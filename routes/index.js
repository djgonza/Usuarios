const express = require('express');
const router = express.Router();

const validateUserToken = require('utilities/validateUserToken');

/* Users */
router.post('/user/create', require('./createUser'));
router.post('/user/login', require('./login'));

/* Tokens */
router.get('/refreshToken', validateUserToken, require('./refreshToken'));



module.exports = router;