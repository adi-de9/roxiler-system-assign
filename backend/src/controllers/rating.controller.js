import { Rating } from "../models/rating.model.js";
import { Store } from "../models/store.model.js";

export const rateStore = async (req, res) => {
  const { storeId, rating, review } = req.body;
  const userId = req.user.id;

  // Validate rating
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: "Rating must be between 1 and 5",
    });
  }

  // Prevent store owner from rating their own store
  const storeRes = await Store.findById(storeId);
  const store = storeRes.rows[0];
  
  

  if (!store) {
    return res.status(404).json({
      success: false,
      message: "Store not found",
    });
  }

  if (store.owner_id === userId) {
    return res.status(400).json({
      success: false,
      message: "Store owners cannot rate their own store",
    });
  }
  
  const reviewCheck   =
    review && typeof review === "string" ? review.slice(0, 1000) : null;


  // Create or Update Rating
  const result = await Rating.createOrUpdate(userId, storeId, rating, reviewCheck);

  // Get updated average rating
  const avgRes = await Rating.average(storeId);
  const avgRating = avgRes.rows[0].avg_rating;

  res.json({
    success: true,
    userRating: result.rows[0],
    averageRating: Number(avgRating),
  });
};
