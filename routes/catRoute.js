'use strict';
// catRoute

const express = require('express');
const {cat_post} = require('../controllers/catController');
const {cat_get} = require('../controllers/catController');
const {cat_list_get} = require('../controllers/catController');
const router = express.Router();
const multer = require('multer');
const {cat_update} = require('../controllers/catController');
const {cat_delete} = require('../controllers/catController');

const {body} = require("express-validator");

const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes("image")) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({dest: './uploads/', fileFilter});


router.route('/')
    .get(cat_list_get)
    .post(upload.single("cat"),
        body("name").not().isEmpty(),
        body("birthdate").isDate(),
        body("weight").isNumeric(),
        body("owner").not().isEmpty(),
        cat_post)


router.route('/:catId')
    .get(cat_get)
    .delete(cat_delete)
    .put(cat_update);


module.exports = router;