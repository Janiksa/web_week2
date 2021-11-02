'use strict'

const express = require('express');
const { user_get } = require('../controllers/userController');
const router = express.Router();


router.get('/:userId', user_get);

module.exports = router;


