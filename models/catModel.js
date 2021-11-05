'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

// get the client
const mysql = require('mysql2');

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getCat = async(catId) => {
  try{
  const [rows] = await promisePool.execute('SELECT * FROM wop_cat WHERE cat_id = ?', [catId]);
  console.log("get by result?", rows);
  return rows[0];}
  catch (e) {
    console.error("error", e.message);
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
  deleteCat
}
