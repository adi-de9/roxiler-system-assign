import { Rating } from "../models/rating.model.js";

export const ownerRatings = async (req, res) => {
  const ownerId = req.user.id;
  const result = await Rating.getUsersWhoRatedOwner(ownerId);
  res.json(result.rows);
};

export const ownerAverageRating = async (req, res) => {
  const ownerId = req.user.id;
  const result = await Rating.getOwnerAverage(ownerId);
  res.json(result.rows[0]);
};
