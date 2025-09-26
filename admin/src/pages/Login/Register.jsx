import React from "react";
import { Container, Row, Col, Card, Button,Form } from "react-bootstrap";

const Register = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100 bg-light"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-lg p-4">
            <h3 className="text-center mb-4">Đăng ký tài khoản</h3>
            <Form>
              <Form.Group className="mb-3" controlId="fullname">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập họ tên"
                  name="fullname"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email"
                  name="email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  name="password"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  name="confirmPassword"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Đăng ký
              </Button>

              <p className="text-center mt-3 mb-0">
                Đã có tài khoản? <a href="/login">Đăng nhập</a>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
