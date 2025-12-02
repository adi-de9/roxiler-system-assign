import { Store } from "../models/store.model.js";

export const getStores = async (req, res) => {
  const stores = await Store.findAll();
  res.json(stores.rows);
};

export const searchStores = async (req, res) => {
  const { q } = req.query;
  const stores = await Store.search(q);
  res.json(stores.rows);
};
