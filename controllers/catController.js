'use strict';
// catController

const catModel = require('../models/catModel');
const {deleteCat} = require('../models/catModel');
const {insertCat} = require('../models/catModel');
const { getCat } = require('../models/catModel');
const { cats } = require('../models/catModel')

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const cat_get = async (req, res) => {
  const cat = await getCat(req.params.catId);
  res.json({cat});
}

const cat_post = async (req, res) => {
  console.log("Add cat data", req.body);
  console.log("Filename", req.file);
  const cat = req.body;
  cat.filename = req.file.filename;
  const id = await insertCat(cat);
  res.send(id);
}

const cat_delete = async (req, res) => {
  await deleteCat(req.params.catId);
  res.send('cat deleted');
}

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_delete
}