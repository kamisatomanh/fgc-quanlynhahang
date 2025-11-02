import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Spinner,
  Placeholder,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import toast from "react-hot-toast";

const EditStaff = () => {
  const { id } = useParams();
  const { fetchUserById, editUser } = useUsers();

  const [userDetail, setUserDetail] = useState(null);
  const [originalUser, setOriginalUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const naviagte = useNavigate();

  const handleOnChange = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };

  // Lấy dữ liệu người dùng theo ID
  const handleGetUserById = async () => {
    try {
      setLoading(true);
      const user = await fetchUserById(id);
      setUserDetail(user);
      setOriginalUser(user);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetUserById();
  }, [id]);

  // Skeleton hiển thị khi đang fetch
  if (loading) {
    return (
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="p-4 shadow-sm">
            <h3 className="text-center mb-4">
              <Placeholder as="span" animation="wave">
                <Placeholder xs={6} />
              </Placeholder>
            </h3>

            <Placeholder as="p" animation="glow">
              <Placeholder xs={12} className="mb-3" />
              <Placeholder xs={12} className="mb-3" />
              <Placeholder xs={6} className="mb-3" />
            </Placeholder>

            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Đang tải dữ liệu nhân sự...</p>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }

  // Nếu không có dữ liệu
  if (!userDetail) {
    return (
      <div className="text-center mt-5">
        <p>Không tìm thấy nhân sự.</p>
        <Link to="/staffs" className="btn btn-primary">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  // So sánh cũ và mới

  const isChange = (a, b) => {
    return JSON.stringify(a) !== JSON.stringify(b);
  };

  const handleSumit = async (e) => {
    e.preventDefault();

    if (!isChange(userDetail, originalUser)) {
      alert("Không có thay đổi nào để cập nhật");
      return;
    }

    try {
      setSaving(true);
      await editUser(id, userDetail);
      toast.success("Sửa người dùng thành công");
      setOriginalUser(userDetail); // Cập nhật bản gốc mới
      naviagte("/staffs");
    } catch (error) {
      toast.error("Sửa người dùng thất bại!");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (!userDetail) {
    return <p className="text-center mt-5">Không tìm thấy nhân sự.</p>;
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={10} lg={8}>
        <Card className="p-4 shadow-sm">
          <h3 className="text-center mb-4">
            Sửa nhân sự{" "}
            <span className="text-primary">{userDetail.full_name}</span>
          </h3>
          <Form onSubmit={handleSumit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="full_name">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="full_name"
                    value={userDetail.full_name || ""}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="bank_name">
                  <Form.Label>Tên ngân hàng</Form.Label>
                  <Form.Control
                    type="text"
                    name="bank_name"
                    value={userDetail.bank_name || ""}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="bank_number">
                  <Form.Label>Số tài khoản</Form.Label>
                  <Form.Control
                    type="text"
                    name="bank_number"
                    value={userDetail.bank_number || ""}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="phone_number">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone_number"
                    value={userDetail.phone_number || ""}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="role">
                  <Form.Label>Chức vụ</Form.Label>
                  <Form.Select
                    onChange={handleOnChange}
                    value={userDetail.role || ""}
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
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Đang lưu...
                  </>
                ) : (
                  "Cập nhật nhân sự"
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

export default EditStaff;
