"use strict";

var express = require('express'),
    cors = require('cors'),
    app = express(),
    dotenv = require('dotenv');

dotenv.config();

var routes = require('./app/routes/index');

var corsOptions = {
  origin: 'http://localhost:8081'
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  res.json({
    message: 'Welcome'
  });
});

var db = require('./app/models');

var Role = db.role;
db.sequelize.sync({
  force: true
}).then(function () {
  console.log('Drop and Resync Db');
  initial();
});
app.use('/api', routes); // app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
//     next();
//   });
// set port, listen for requests

var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT, "."));
});

function initial() {
  Role.create({
    id: 1,
    rolename: 'user',
    name: 'Пользователь'
  });
  Role.create({
    id: 2,
    rolename: 'admin',
    name: 'Администратор'
  });
}