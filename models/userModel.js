'use strict';

const {body, validationResult} = require('express-validator');


const pool = require('../database/db');
const promisePool = pool.promise();

const mysql = require('mysql2');

const getUser = async (userId) => {
    try {
        const [rows] = await promisePool.execute(
            "SELECT * FROM wop_user WHERE user_id = ?", [userId]);
        console.log("get by result?", rows);
        return rows[0];
    } catch (e) {
        console.error("error", e.message);
    }
}

const getAllUsers = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM wop_user');
        return rows;
    } catch (e) {
        console.error('error', e.message);
    }
};


const insertUser = async (user) => {
    try {
        const [rows] = await promisePool.execute('INSERT INTO wop_user (name, email, password) VALUES (?,?,?)',
            user);
        console.log("Model insert user", rows);
        return rows
    } catch (e) {
        console.error("Model insert user", e.message);
    }
};


const userDelete = async (id, user) => {
    try {
        if (user.role === 0) {
            await promisePool.query('DELETE FROM wop_user WHERE user_id = ?', [id]);
            return;
        }
        await promisePool.query('DELETE FROM wop_user WHERE user_id = ?', [user.id]);
    } catch (e) {
        console.log('error deleting');
    }
}


const userUpdate = async (body, user, id) => {
    try{
        if (user.role === 0){
            await promisePool.query('UPDATE wop_user SET name = ?, email = ?, password = ? WHERE user_id = ?', [body.name, body.email, body.password, id]);
            return
        }
        await promisePool.query('UPDATE wop_user SET name = ?, email = ?, password = ? WHERE user_id = ?', [body.name, body.email, body.password, user.id]);
    } catch (e){
        console.log('Error updating user');
    }
}


const getUserLogin = async (params) => {
    try {
        console.log(params);
        const [rows] = await promisePool.execute(
            'SELECT * FROM wop_user WHERE email = ?;',
            params);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};


module.exports = {
    getUser,
    getAllUsers,
    insertUser,
    getUserLogin,
    userDelete,
    userUpdate
};
