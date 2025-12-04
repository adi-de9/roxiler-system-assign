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

  count: () => pool.query("SELECT COUNT(*) FROM users"),

  search: (search) =>
    pool.query(`SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1`, [
      `%${search}%`,
    ]),

  find: (search) =>
    pool.query(`SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1`, [
      `%${search}%`,
    ]),

  updateRole: (id, role) =>
    pool.query(`UPDATE users SET role=$1 WHERE id=$2`, [role, id]),
};
