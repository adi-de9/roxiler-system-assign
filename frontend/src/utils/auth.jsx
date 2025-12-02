import apiClient from "./apiClient";

export const login = async (data) => {
  console.log(data);

  const res = await apiClient.post("/auth/login", data);
  return res.data;
};

export const SignUp = async (data) => {
  const res = await apiClient.post("/auth/signup", data);
  return res.data;
};

export const updatePassword = async (data) => {
  const res = await apiClient.post("/auth/update-password", data);
  return res.data;
};

export const logout = async (data) => {
  const res = await apiClient.post("/auth/logout", data);
  return res.data;
};

export const getUser = async (data) => {
  const res = await apiClient.get("/auth/me", data);
  return res.data;
};
