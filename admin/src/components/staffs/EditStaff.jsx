import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const EditStaff = () => {
  const { id } = useParams();
  console.log("EditStaff component rendered"); // Debugging line to check rendering

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={10} lg={8}>
        {" "}
        {/* rộng hơn: chiếm 10/12 trên md và 8/12 trên lg */}
        <Card className="p-4 shadow-sm">
          <h3 className="text-center mb-4">Sửa nhân sự {id}</h3>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập họ tên"
                    name="name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="role">
                  <Form.Label>Chức vụ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ví dụ: Quản lý, Nhân viên, Đầu bếp"
                    name="role"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Nhập email"
                    name="email"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    name="phone"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid">
              <Button type="submit" variant="primary" size="lg">
                Sửa nhân sự
              </Button>
            </div>

            <Link
              to="/staffs"
              className="btn btn-link mt-3 d-block text-center"
            >
              Quay lại danh sách nhân sự
            </Link>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default EditStaff;
