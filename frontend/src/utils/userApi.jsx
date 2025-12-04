import apiClient from "./apiClient";

export const rateStore = async (ratingData) => {
  const res = await apiClient.post("/user/rate", ratingData);
  return res.data;
};


export const getStoresForUser = async () => {
  const res = await apiClient.get("/user/stores");
  return res.data;
};
