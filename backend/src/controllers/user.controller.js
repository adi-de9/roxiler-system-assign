import { pool } from "../db/db.js";

export const getStores = async (req, res) => {
  const userId = req.user.id;

  const query = `
SELECT 
  s.id,
  s.name,
  s.address,

  -- ⭐ Overall average rating
  COALESCE((ROUND(AVG(r.rating)::numeric, 2))::double precision, 0) AS average_rating,

  -- ⭐ User's own rating
  COALESCE(
    (SELECT rating::double precision 
     FROM ratings 
     WHERE user_id = $1 AND store_id = s.id),
    0
  ) AS user_rating,

  -- ⭐ How many total ratings?
  COUNT(r.id) AS rating_count,

  -- ⭐ Only this user's review (if exists)
  COALESCE(
    (
      SELECT json_build_object(
        'rating', rating,
        'review', review,
        'updated_at', updated_at
      )
      FROM ratings 
      WHERE user_id = $1 AND store_id = s.id
    ),
    '{}'       -- return {} if user has not reviewed
  ) AS user_review

FROM stores s
LEFT JOIN ratings r ON r.store_id = s.id
LEFT JOIN users ru ON ru.id = r.user_id
GROUP BY s.id
ORDER BY s.name ASC;
  `;

  const result = await pool.query(query, [userId]);

  res.json({
    success: true,
    stores: result.rows,
  });
};


