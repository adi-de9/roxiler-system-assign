import { pool } from "../db/db.js";

export const Store = {
  create: (name, email, address, ownerId) =>
    pool.query(
      `INSERT INTO stores (name, email, address, owner_id)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [name, email, address, ownerId]
    ),

  findAll: () => pool.query("SELECT * FROM stores ORDER BY name ASC"),

  findById: (id) => pool.query("SELECT * FROM stores WHERE id=$1", [id]),
};
