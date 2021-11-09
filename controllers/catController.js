'use strict';
// catController

const {body, validationResult} = require('express-validator');

const catModel = require('../models/catModel');
const {httpError} = require("../utils/errors");
const {updateCat} = require('../models/catModel');
const {deleteCat} = require('../models/catModel');
const {insertCat} = require('../models/catModel');
const {getCat} = require('../models/catModel');
const {cats} = require('../models/catModel')

const cat_list_get = async (req, res, next) => {
    const cats = await catModel.getAllCats();
    if (cats.length > 0) {
        res.json(cats);
    } else {
        const err = httpError("Cats not found", 404);
        next(err);
    }
};

const cat_get = async (req, res, next) => {
    const cat = await getCat(req.params.catId, next);
    if (!cat) {
        const err = httpError("Cat not found", 404);
        next(err);
        return;
    }
    res.json({cat});
}

const cat_post = async (req, res, next) => {
    try {
        console.log("Add cat data", req.body);
        console.log("Filename", req.file);
        if (!req.file) {
            const err = httpError("invalid file", 400);
            next(err);
            return;
        }
        const cat = req.body;
        cat.filename = req.file.filename;
        const id = await insertCat(cat);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error("user_post validation", errors.array());
            const err = httpError("data not valid", 400);
            next(err);
            return;
        }
        res.sendStatus(id);
    } catch (e) {
        console.log(e, "cat_post")
    }
}

const cat_update = async (req, res) => {
    const updated = await updateCat(req.body);
    res.json({message: `Cat updated: ${updated}`});
};


const cat_delete = async (req, res) => {
    await deleteCat(req.params.catId);
    res.send('cat deleted');
}

module.exports = {
    cat_list_get,
    cat_get,
    cat_post,
    cat_delete,
    cat_update
}