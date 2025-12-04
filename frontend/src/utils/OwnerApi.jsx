import apiClient from "./apiClient";

export const getOwnerStats = async () => {
  const res = await apiClient.get(`/owner/owner-stats`);
  return res.data;
};
