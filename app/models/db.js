const mysql = require("mysql");
const fs = require("fs");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  ssl: {
    // ca: fs.readFileSync(__dirname + "/../..//DigiCertGlobalRootCA.crt.pem"),
    ca: process.env.DB_CERTIFICATE,
  },
});

module.exports = connection;
