'use strict';


const express = require('express');
require('dotenv').config()
const catRoute = require("./routes/catRoute.js");
const userRoute = require("./routes/userRoute.js");
const passport = require("./utils/pass.js");
const authRoute = require("./routes/authRoute.js");
const app = express();
const cors = require('cors')
const {httpError} = require("./utils/errors");
const https = require('https');
const fs = require('fs');
const http = require('http');
const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')

const options = {
    key: sslkey,
    cert: sslcert
};

https.createServer(options, app).listen(8000);

http.createServer((req, res) => {
    res.writeHead(301, { 'Location': 'https://localhost:8000' + req.url });
    res.end();
}).listen(3000);

const port = 3000;




app.use(cors());
app.use(passport.initialize());

app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

app.use("/cat", passport.authenticate("jwt", {session: false}), catRoute);
app.use("/user", passport.authenticate("jwt", {session: false}), userRoute);
app.use('/auth', authRoute);

app.get('/', (req, res) => {
    if (req.secure) {
        res.send('Hello Secure World!');
    } else {
        res.send('not secured?');
    }
});



app.use((req, res, next) => {
    const err = httpError("Not Found", 404);
    next(err);
});

//Error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({message: err.message || "internal error"});
});


//app.listen(port, () => console.log(`Example app listening on port localhost:${port}/cat!`));
