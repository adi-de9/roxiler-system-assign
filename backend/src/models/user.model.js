import { pool } from "../db/db.js";

export const User = {
  create: (name, email, password, address, role) =>
    pool.query(
      `INSERT INTO users (name, email, password, address, role)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [name, email, password, address, role]
    ),

  findByEmail: (email) =>
    pool.query("SELECT * FROM users WHERE email=$1", [email]),

  findById: (id) => pool.query("SELECT * FROM users WHERE id=$1", [id]),

  updatePassword: (id, newPassword) =>
    pool.query("UPDATE users SET password=$1 WHERE id=$2", [newPassword, id]),
};
