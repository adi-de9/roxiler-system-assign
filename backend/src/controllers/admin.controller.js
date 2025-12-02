import { Rating } from "../models/rating.model.js";
import { Store } from "../models/store.model.js";
import { User } from "../models/user.model.js";

export const addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create(name, email, hashed, address, role);
    res.json(user.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const addStore = async (req, res) => {
  const { name, email, address, ownerId } = req.body;

  const result = await Store.create(name, email, address, ownerId);
  res.json(result.rows[0]);
};

export const adminDashboard = async (req, res) => {
  const users = await User.count();
  const stores = await Store.count();
  const ratings = await Rating.count();

  res.json({
    total_users: users.rows[0].count,
    total_stores: stores.rows[0].count,
    total_ratings: ratings.rows[0].count,
  });
};

export const listUsers = async (req, res) => {
  const { search = "" } = req.query;

  const users = await User.search(search);
  res.json(users.rows);
};

export const listStores = async (req, res) => {
  const { search = "" } = req.query;

  const stores = await Store.search(search);
  res.json(stores.rows);
};

export const userDetails = async (req, res) => {
  const { id } = req.params;

  const userRes = await User.findById(id);
  const user = userRes.rows[0];

  res.json(user);
};
