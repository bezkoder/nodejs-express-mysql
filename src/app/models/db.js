const mysql = require("mysql");
const fs = require("fs");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  ssl: {
    ca: `-----BEGIN CERTIFICATE-----\n${dbConfig.CERTIFICATE}\n-----END CERTIFICATE-----`,
  },
});

module.exports = connection;
