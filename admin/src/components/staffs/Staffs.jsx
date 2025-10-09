import React from "react";

import { useNavigate } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";

const Staffs = () => {
  const navigate = useNavigate();

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
    <Container className="mt-4">
      <h4 className="mb-3">Danh sách nhân sự</h4>
      <Button
        onClick={() => navigate("/staffs/add-staff")}
        className="mb-3"
        variant="primary"
      >
        {" "}
        Thêm nhân sự
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Họ tên</th>
            <th>Chức vụ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>
                <a
                  onClick={() => navigate(`/staffs/edit-staff/${item.id}`)}
                  className="btn btn-warning text-white"
                  href=""
                >
                  Sửa
                </a>{" "}
                <a className="btn btn-danger text-white" href="">
                  Xóa
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Staffs;
