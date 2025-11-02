import { useEffect, useState } from "react";
import {
  createUser,
  getUsers,
  deleteUserId,
  getUserId,
  updateUser,
} from "../api/users";
import { toast } from "react-hot-toast";
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Thêm người dùng mới
  const addUser = async (userData) => {
    try {
      const newUser = await createUser(userData); // Giả sử addUser là hàm gọi API thêm user
      setUsers((prevUsers) => [...prevUsers, newUser]);

      return newUser;
    } catch (error) {
      console.error("Lỗi khi thêm user:", error);
      throw error;
    }
  };

  // Xóa người dùng

  const deleteUser = async (userID) => {
    try {
      await deleteUserId(userID);
      toast.success("Xóa người dùng thành công!");
      setUsers((prevUsers) => prevUsers.filter((item) => item.id !== userID));
    } catch (error) {
      console.error("Lỗi khi xóa user:", error);
      throw error;
    }
  };

  // Lấy người dùng từ Id

  const fetchUserById = async (userID) => {
    try {
      const user = await getUserId(userID);
      return user;
    } catch (error) {
      console.error("Lỗi khi lấy user theo ID:", error);
      throw error;
    }
  };

  const editUser = async (userID, userData) => {
    try {
      const updatedUser = await updateUser(userID, userData);
      // Cập nhật user trong state
      setUsers((prev) =>
        prev.map((user) => (user.id === userID ? updatedUser : user))
      );
      return updatedUser;
    } catch (error) {
      console.error("Lỗi khi sửa user:", error);
      throw error;
    }
  };
  // Sửa người dùng

  // const updateUser = async (userId) => {
  //   try {
  //   } catch (error) {
  //     console.error("Lỗi khi sửa user:", error);
  //     throw error;
  //   }
  // };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    addUser,
    deleteUser,
    fetchUserById,
    editUser,
  };
};
