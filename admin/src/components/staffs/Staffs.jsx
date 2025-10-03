import React from "react";
import TableData from "../table/TableData";
import { useNavigate } from "react-router-dom";

const Staffs = () => {
  const navigate = useNavigate();

  const handleAddStaff = () => {
    navigate("/staffs/add-staff");
  }
  const data = [
    {
      id: 1,
      name: "Nguyen Van A",
      role: "Nhan Vien",
    },
    {
      id: 2,
      name: "Nguyen Van B",
      role: "Nhan Vien",
    },
    {
      id: 3,
      name: "Nguyen Van C",
      role: "Nhan Vien",
    },
  ];
  return (
    <>
      <TableData navigate={handleAddStaff} data={data} />
    </>
  );
};

export default Staffs;
