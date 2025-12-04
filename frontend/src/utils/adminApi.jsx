import apiClient from "./apiClient";

const addStore = async (data) => {
  console.log(data);
  
  const res = await apiClient.post("/admin/add-store", data);
  return res.data;
};

const addUser = async (data) => {
  const res = await apiClient.post("/admin/add-user", data);
  return res.data;
};

const getStores = async (data) => {
  if(data?.length > 0){
    const res = await apiClient.get(`/admin/stores?search=${data}`);
    return res.data;
  }
  const res = await apiClient.get("/admin/stores");
  return res.data;
};

const getUsers = async (search) => {
  if(search?.length > 0){
    const res = await apiClient.get(`/admin/users?search=${search}`);
    return res.data;
  }
  const res = await apiClient.get(`/admin/users`);
  return res.data;
};

const getDashboardStats = async (data) => {
  const res = await apiClient.get("/admin/stats", data);
  return res.data;
};

const getUserById = async (id) => {
  const res = await apiClient.get(`/admin/users/${id}`);
  return res.data;
};

export { addStore, addUser, getStores, getUsers, getDashboardStats, getUserById };