import React from "react";
import { Container, Table } from "react-bootstrap";

const TableData = ({ data }) => {
  console.log(data);

  return (
    <Container className="mt-4">
      <h4 className="mb-3">Danh sách nhân sự</h4>
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
                <a className="btn btn-warning text-white" href="">
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

export default TableData;
