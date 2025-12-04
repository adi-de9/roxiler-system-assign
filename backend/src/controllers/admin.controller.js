import { Rating } from "../models/rating.model.js";
import { Store } from "../models/store.model.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create(name, email, hashed, address, role);
    res.json({ success: true, user: user.rows[0] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const addStore = async (req, res) => {
  const { name, email, address, ownerId } = req.body;

  //Check if owner exists
  const ownerRes = await User.findById(ownerId);
  const owner = ownerRes.rows[0];

  if (!owner) {
    return res
      .status(400)
      .json({ success: false, message: "Owner does not exist!" });
  }

  // 2. If role = USER → upgrade to OWNER
  if (owner.role === "USER") {
    await User.updateRole(ownerId, "OWNER");
    owner.role = "OWNER";
  }

  // 3. If role is not OWNER → still invalid (like ADMIN)
  if (owner.role !== "OWNER") {
    return res.status(400).json({
      success: false,
      message: "User cannot be a store owner",
    });
  }

  //create store
  const result = await Store.create(name, email, address, ownerId);

  res.json({ success: true, store: result.rows[0] });
};

export const adminDashboard = async (req, res) => {
  const users = await User.count();
  const stores = await Store.count();
  const ratings = await Rating.count();

  res.json({
    success: true,
    stats: {
      total_users: Number(users.rows[0].count),
      total_stores: Number(stores.rows[0].count),
      total_ratings: Number(ratings.rows[0].count),
    },
  });
};

export const listUsers = async (req, res) => {
  const { search = "" } = req.query;

  let users;
  if (search.trim() === "") {
    users = await User.find();
  }

  users = await User.search(search);
  res.json({ success: true, users: users.rows });
};

export const listStores = async (req, res) => {
  const { search = "" } = req.query;

  let stores;
  if (search.trim() === "") {
    stores = await Store.findAll();
  }

  stores = await Store.search(search);
  res.json({ success: true, stores: stores.rows });
};

export const userDetails = async (req, res) => {
  const { id } = req.params;

  const userRes = await User.findById(id);
  const user = userRes.rows[0];

  const average_rating = await Rating.average(id);

  res.json({
    success: true,
    user: user,
    average_rating: average_rating.rows[0].avg_rating,
  });
};
