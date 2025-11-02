import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Spinner,Card,Placeholder } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useShifts } from "../../hooks/useShifts";
const EditShift = () => {
  const { id } = useParams();
  const { fetchShiftById, editShift } = useShifts();

  const [shiftDetail, setShiftDetail] = useState();
  
  const [originalShift, setOriginalShift] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const navigate = useNavigate();
  
  const isMixedShift = shiftDetail?.shift_name === "ca hỗn hợp";
  const handleTimeChange = (index, field, value) => {
    const updatedArray = [...shiftDetail[field]];
    updatedArray[index] = value;
    setShiftDetail((prev) => ({ ...prev, [field]: updatedArray }));
  };
  const handleOnChange = (e) => {
    setShiftDetail({
      ...shiftDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetShiftById = async () => {
    try {
      setLoading(true);

      const shift = await fetchShiftById(id);
      setShiftDetail(shift);
      setOriginalShift(shift);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetShiftById();
  }, [id]);

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
  if (!shiftDetail) {
    return (
      <div className="text-center mt-5">
        <p>Không tìm ca làm việc.</p>
        <Link to="/shifts" className="btn btn-primary">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const isChange = (a, b) => {
    return JSON.stringify(a) !== JSON.stringify(b);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChange(shiftDetail, originalShift)) {
      alert("Không có thay đổi nào để cập nhật");
      return;
    }

    try {
      setSaving(true);
      await editShift(id, shiftDetail);
      toast.success("Sửa ca làm việc thành công");
      setOriginalShift(shiftDetail); // Cập nhật bản gốc mới
      navigate("/shifts");
    } catch (error) {
      toast.error("Sửa ca làm việc thất bại!");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={10} lg={8}>
        <Card className="p-4 shadow-sm">
          <h3 className="text-center mb-4">
            Sửa nhân sự{" "}
            <span className="text-primary">{shiftDetail.full_name}</span>
          </h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên ca</Form.Label>
                  <Form.Select
                    name="shift_name"
                    value={shiftDetail.shift_name}
                    onChange={handleOnChange}
                    required
                  >
                    <option value="">-- Chọn ca --</option>
                    <option value="ca sáng">Ca sáng</option>
                    <option value="ca chiều">Ca chiều</option>
                    <option value="ca hỗn hợp">Ca hỗn hợp</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Áp dụng từ</Form.Label>
                  <Form.Control
                    type="date"
                    name="effective_from"
                    value={shiftDetail.effective_from}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Áp dụng đến</Form.Label>
                  <Form.Control
                    type="date"
                    name="effective_to"
                    value={shiftDetail.effective_to}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </Col>

              {/* Ca sáng */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Bắt đầu (ca sáng)</Form.Label>
                  <Form.Control
                    type="time"
                    value={shiftDetail.start_time[0]}
                    onChange={(e) =>
                      handleTimeChange(0, "start_time", e.target.value)
                    }
                    // required={!isMixedShift}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Kết thúc (ca sáng)</Form.Label>
                  <Form.Control
                    type="time"
                    value={shiftDetail.end_time[0]}
                    onChange={(e) =>
                      handleTimeChange(0, "end_time", e.target.value)
                    }
                   
                  />
                </Form.Group>
              </Col>

              {/* Chỉ hiển thị nếu là ca hỗn hợp */}
              {isMixedShift && (
                <>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Bắt đầu (ca chiều)</Form.Label>
                      <Form.Control
                        type="time"
                        value={shiftDetail.start_time[1]}
                        onChange={(e) =>
                          handleTimeChange(1, "start_time", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Kết thúc (ca chiều)</Form.Label>
                      <Form.Control
                        type="time"
                        value={shiftDetail.end_time[1]}
                        onChange={(e) =>
                          handleTimeChange(1, "end_time", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </>
              )}
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
              to="/shifts"
              className="btn btn-link mt-3 d-block text-center"
            >
              Quay lại danh sách ca làm việc
            </Link>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default EditShift;
