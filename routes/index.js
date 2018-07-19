const express = require('express');
const router = express.Router();

/* Users */
router.post('/user/create', require('./createUser'));
/* Tokens */
router.post('/token/refreshToken', require('./refreshToken'));
router.get('/token/accessToken', require('./accessToken'));
router.post('/token/validateAccessToken', require('./validateAccessToken'));

module.exports = router;