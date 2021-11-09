"use strict";

const httpError = (msg, status) => {
    const err = new Error(msg);
    err.status = status;
    return err;
};

module.exports = {
    httpError,
};