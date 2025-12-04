import { Rating } from "../models/rating.model.js";
import { Store } from "../models/store.model.js";

export const ownerStats = async (req, res) => {
  const ownerId = req.user.id;

  const [stores, avg, ratings] = await Promise.all([
    Store.countByOwner(ownerId),
    Rating.getOwnerAverageRating(ownerId),
    Rating.getOwnerRecentRatings(ownerId),
  ]);

  res.json({
    success: true,
    total_stores: stores.rows[0].total_stores,
    average_rating: avg.rows[0].average_rating || 0,
    recent_ratings: ratings.rows,
  });
};
