import { pool } from "../db/db.js";

export const Rating = {
  createOrUpdate: (userId, storeId, rating) =>
    pool.query(
      `INSERT INTO ratings (user_id, store_id, rating)
       VALUES ($1,$2,$3)
       ON CONFLICT (user_id,store_id)
       DO UPDATE SET rating=$3, updated_at=NOW()
       RETURNING *`,
      [userId, storeId, rating]
    ),

  average: (storeId) =>
    pool.query(
      `SELECT AVG(rating) as avg_rating
       FROM ratings WHERE store_id=$1`,
      [storeId]
    ),

  getUsersWhoRated: (storeId) =>
    pool.query(
      `SELECT users.id, users.name, users.email, ratings.rating
       FROM ratings 
       JOIN users ON users.id = ratings.user_id
       WHERE store_id=$1`,
      [storeId]
    ),
};
