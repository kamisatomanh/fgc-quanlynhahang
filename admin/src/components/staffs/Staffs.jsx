import React from "react";
import TableData from "../table/TableData";

const Staffs = () => {
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
      <TableData data={data} />
    </>
  );
};

export default Staffs;
