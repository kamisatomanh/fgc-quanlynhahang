import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import { toast } from "react-hot-toast";
export const AddStaff = () => {
  const { addUser } = useUsers();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    bank_name: "",
    bank_number: "",
    phone_number: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addUser(formData);
      toast.success("Thêm người dùng thành công!");
      setFormData({
        full_name: "",
        role: "",
        bank_name: "",
        bank_number: "",
        phone_number: "",
      });
      navigate("/staffs");
    } catch (err) {
      toast.error("Thêm người dùng thất bại!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={10} lg={8}>
        <Card className="p-4 shadow-sm">
          <h3 className="text-center mb-4">Thêm nhân sự</h3>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập họ tên"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleOnChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Tên ngân hàng</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tên ngân hàng"
                    name="bank_name"
                    value={formData.bank_name}
                    onChange={handleOnChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Số tài khoản</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Số tài khoản"
                    name="bank_number"
                    value={formData.bank_number}
                    onChange={handleOnChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Số điện thoại"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleOnChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="role">
                  <Form.Label>Chức vụ</Form.Label>
                  <Form.Select
                    value={formData.role}
                    onChange={handleOnChange}
                    name="role"
                    required
                  >
                    <option value="">-- Chọn chức vụ --</option>
                    <option value="manager">Quản lý</option>
                    <option value="staff">Nhân viên</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                  </>
                ) : (
                  "Thêm nhân sự"
                )}
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
