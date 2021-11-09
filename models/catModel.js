'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

// get the client
const mysql = require('mysql2');
const {httpError} = require("../utils/errors");

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query('SELECT cat_id, wop_cat.name AS name, weight, birthdate, filename, wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON owner = user_id');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getCat = async(catId, next) => {
  try{
  const [rows] = await promisePool.execute('SELECT cat_id, wop_cat.name AS name, weight, birthdate, filename, wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON owner = user_id WHERE cat_id = ?', [catId]);
  console.log("get by id result?", rows);
  return rows[0];
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

const insertCat = async (cat) => {
  try {
    //TODO filename, catowner
    const [rows] = await promisePool.execute('INSERT INTO wop_cat (name, weight, owner, birthdate, filename) VALUES (?,?,?,?,?)',
    [cat.name, cat.weight, cat.owner, cat.birthdate, cat.filename]);
    console.log("Model insert cat", rows);
    return rows.insertId;
  } catch (e) {
    console.error("Model insert cat", e.message);
  }
};

const updateCat = async (cat) => {
  try {
    const [rows] = await promisePool.execute('UPDATE wop_cat SET name = ?, weight = ?, owner = ?, birthdate = ? WHERE cat_id = ?',[cat.name, cat.weight, cat.owner, cat.birthdate, cat.id]);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('model update cat', e.message);
  }
};


const deleteCat = async (catId) => {
  try{
    const [rows] = await promisePool.execute("DELETE FROM wop_cat WHERE cat_id = ?", [catId]);
    console.log("model delete cat", rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error("Model insert cat", e.message);
  }
}

module.exports = {
  getCat,
  getAllCats,
  insertCat,
  deleteCat,
  updateCat
}
