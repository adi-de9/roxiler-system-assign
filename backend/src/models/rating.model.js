import { pool } from "../db/db.js";

export const Rating = {
  average: (storeId) => pool.query(
    `SELECT ROUND(AVG(rating)::numeric, 2)::double precision AS avg_rating
       FROM ratings
       WHERE store_id = $1`,
    [storeId]
  ),

  createOrUpdate: (userId, storeId, rating, review = null) =>
    pool.query(
      `INSERT INTO ratings (user_id, store_id, rating, review)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, store_id)
       DO UPDATE SET rating = EXCLUDED.rating, review = EXCLUDED.review, updated_at = NOW()
       RETURNING *`,
      [userId, storeId, rating, review]
    ),

  getOwnerRecentRatings: (ownerId) =>
    pool.query(
      `SELECT 
        r.id,
        u.name AS user_name,
        s.name AS store_name,
        r.rating,
        r.review,
        r.updated_at::date AS date
     FROM ratings r
     JOIN stores s ON r.store_id = s.id
     JOIN users u ON r.user_id = u.id
     WHERE s.owner_id = $1
     ORDER BY r.updated_at DESC
     LIMIT 10`,
      [ownerId]
    ),

  getOwnerAverageRating: (ownerId) =>
    pool.query(
      `SELECT 
        ROUND(AVG(r.rating)::numeric, 2)::double precision AS average_rating
     FROM ratings r
     JOIN stores s ON r.store_id = s.id
     WHERE s.owner_id = $1`,
      [ownerId]
    ),

  count: () => pool.query("SELECT COUNT(*) FROM ratings"),
};
