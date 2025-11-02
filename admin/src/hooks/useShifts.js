import { useEffect, useState } from "react";
import {
  deleteShiftId,
  getShifts,
  createShift,
  getShiftId,
  updateShift,
} from "../api/shifts";
import toast from "react-hot-toast";

export const useShifts = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lay danh sach ca lam viec

  const fetchShifts = async () => {
    try {
      const data = await getShifts();
      setShifts(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Them moi ca lam viec

  const addShift = async (shiftData) => {
    try {
      const newShift = await createShift(shiftData);
      setShifts((prevShifts) => [...prevShifts, newShift]);

      return newShift;
    } catch (error) {
      console.error("Lỗi khi thêm ca làm việc", error);
      throw error;
    }
  };

  const deleteShift = async (shiftID) => {
    try {
      await deleteShiftId(shiftID);
      toast.success("Xóa ca làm việc thành công!");
      setShifts((prevShifts) =>
        prevShifts.filter((item) => item.id !== shiftID)
      );
    } catch (error) {
      console.error("Lỗi khi xóa ca làm việc", error);
      throw error;
    }
  };

  const fetchShiftById = async (shiftID) => {
    try {
      const shift = await getShiftId(shiftID);
      return shift;
    } catch (error) {
      console.error("Lỗi khi lấy ca làm việc theo ID:", error);
      throw error;
    }
  };

  const editShift = async (shiftID, shiftData) => {
    try {
      const updated = await updateShift(shiftID, shiftData);

      setShifts((prev) =>
        prev.map((shift) => (shift.id === shiftID ? updated : shift))
      );
      return updated;
    } catch (error) {
      console.error("Lỗi khi sửa shift:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  return {
    shifts,
    loading,
    error,
    deleteShift,
    addShift,
    editShift,
    fetchShiftById,
  };
};
