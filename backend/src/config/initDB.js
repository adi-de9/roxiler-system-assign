import fs from "fs";
import { pool } from "../db/db.js";
const sql = fs.readFileSync("./src/config/schema.sql").toString();
console.log(sql);

pool
  .query(sql)
  .then(() => {
    console.log("Tables created.");
    process.exit();
  })
  .catch((err) => console.error(err));
