import api from "./index";

export const getShifts = async () => {
  const response = await api.get("/shifts");
  return response.data;
};

export const createShift = async (shiftData) => {
  const response = await api.post("/shifts", shiftData);
  return response.data;
};

export const deleteShiftId = async (shiftID) => {
  const response = await api.delete(`/shifts/${shiftID}`);
  return response.data;
};


export const getShiftId = async (shiftID) => {
  const response = await api.get(`/shifts/${shiftID}`);
  return response.data;
};

export const updateShift = async (shiftID, shiftData) => {
  const response = await api.put(`/shifts/${shiftID}`, shiftData);
  return response.data;
};

