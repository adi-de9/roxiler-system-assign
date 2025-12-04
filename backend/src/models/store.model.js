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

  count: () => pool.query("SELECT COUNT(*) FROM stores"),

  search: (searchTerm) =>
    pool.query(
      "SELECT * FROM stores WHERE name ILIKE $1 OR email ILIKE $1 OR address ILIKE $1",
      [`%${searchTerm}%`]
    ),

  countByOwner: (ownerId) =>
    pool.query(
      `SELECT COUNT(*)::int AS total_stores 
     FROM stores 
     WHERE owner_id = $1`,
      [ownerId]
    ),
};
