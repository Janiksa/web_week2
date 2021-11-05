'use strict';
// catRoute

const express = require('express');
const { cat_post } = require('../controllers/catController');
const { cat_get } = require('../controllers/catController');
const { cat_list_get } = require('../controllers/catController');
const router = express.Router();
const multer = require('multer');
const {cat_delete} = require('../controllers/catController');
const upload = multer({dest: './uploads/' });

router.get('/', cat_list_get);

router.get('/:catId', cat_get);

router.post('/', upload.single("cat"), cat_post);

router.put('/', (req, res) => {
  res.send('From this endpoint you can edit cats.')
});

router.delete('/:catId', cat_delete);


module.exports = router;