import React from "react";
import { Button, Container, Table } from "react-bootstrap";


const TableData = ({ data, navigate }) => {


  return (
    <Container className="mt-4">
      <h4 className="mb-3">Danh sách nhân sự</h4>
      <Button onClick={navigate} className="mb-3" variant="primary">
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
