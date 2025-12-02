import { Rating } from "../models/rating.model.js";

export const rateStore = async (req, res) => {
  const { storeId, rating } = req.body;
  const userId = req.user.id;

  const result = await Rating.createOrUpdate(userId, storeId, rating);
  res.json(result.rows[0]);
};
