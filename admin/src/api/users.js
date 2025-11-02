import api from "./index";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const deleteUserId = async (userID) => {
  const response = await api.delete(`/users/${userID}`);
  return response.data;
};

export const getUserId = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateUser = async (userID, userData) => {
  const response = await api.put(`/users/${userID}`, userData);
  return response.data;
};
