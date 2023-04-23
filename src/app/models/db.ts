import mysql from "mysql";
import { config as dbConfig } from "../config/db.config";

export const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  ssl: {
    ca: `-----BEGIN CERTIFICATE-----\n${dbConfig.CERTIFICATE}\n-----END CERTIFICATE-----`,
  },
});
