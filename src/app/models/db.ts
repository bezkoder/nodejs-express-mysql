import mysql, { MysqlError } from "mysql";
import { config as dbConfig } from "../config/db.config";
import { Tutorial } from "./tutorial.model";

const sql = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  ssl: {
    ca: `-----BEGIN CERTIFICATE-----\n${dbConfig.CERTIFICATE}\n-----END CERTIFICATE-----`,
  },
});

type Result = (err: MysqlError | Error | null, data: any) => unknown;

export class TutorialDB {
  static create(newTutorial: Tutorial, result: Result) {
    sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
      result(null, { id: res.insertId, ...newTutorial });
    });
  }

  static findById(id: string, result: Result) {
    sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found tutorial: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Tutorial with the id
      result(Error("not_found"), null);
    });
  }

  static getAll(title: string, result: Result) {
    let query = "SELECT * FROM tutorials";

    if (title) {
      query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("tutorials: ", res);
      result(null, res);
    });
  }

  static getAllPublished(result: Result) {
    sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("tutorials: ", res);
      result(null, res);
    });
  }

  static updateById(id: string, tutorial: Tutorial, result: Result) {
    sql.query(
      "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
      [tutorial.title, tutorial.description, tutorial.published, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result(Error("not_found"), null);
          return;
        }

        console.log("updated tutorial: ", { id: id, ...tutorial });
        result(null, { id: id, ...tutorial });
      }
    );
  }

  static remove(id: string, result: Result) {
    sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result(Error("not_found"), null);
        return;
      }

      console.log("deleted tutorial with id: ", id);
      result(null, res);
    });
  }

  static removeAll(result: Result) {
    sql.query("DELETE FROM tutorials", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} tutorials`);
      result(null, res);
    });
  }
}
