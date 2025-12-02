import fs from "fs";
import { pool } from "../config/db.js";

const sql = fs.readFileSync("./src/db/schema.sql").toString();
console.log(sql);

pool
  .query(sql)
  .then(() => {
    console.log("Tables created.");
    process.exit();
  })
  .catch((err) => console.error(err));
