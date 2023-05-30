const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');


router.use('/contacts',  requiresAuth(), require('./contacts'))

module.exports = router;