import React, { useState } from "react";
import { Button, Card, Col, Row, Form, Spinner } from "react-bootstrap";
import { useShifts } from "../../hooks/useShifts";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const AddShift = () => {
  const { addShift } = useShifts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shift_name: "",
    effective_from: "",
    effective_to: "",
    start_time: ["", ""],
    end_time: ["", ""],
  });

  const [loading, setLoading] = useState(false);

  const isMixedShift = formData.shift_name === "ca hỗn hợp";
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addShift(formData);
      toast.success("Thêm ca làm việc thành công!");
      setFormData({
        effective_from: "",
        effective_to: "",
        shift_name: "",
        start_time: "",
        end_time: "",
      });
      navigate("/shifts");
    } catch (error) {
      toast.error("Thêm ca làm việc thất bại!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeChange = (index, field, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updatedArray }));
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={10} lg={8}>
        <Card className="p-4 shadow-sm">
          <h3 className="text-center mb-4">Thêm ca làm việc</h3>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên ca</Form.Label>
                  <Form.Select
                    name="shift_name"
                    value={formData.shift_name}
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
                    value={formData.effective_from}
                    onChange={handleOnChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Áp dụng đến</Form.Label>
                  <Form.Control
                    type="date"
                    name="effective_to"
                    value={formData.effective_to}
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
                    value={formData.start_time[0]}
                    onChange={(e) =>
                      handleTimeChange(0, "start_time", e.target.value)
                    }
                    required={!isMixedShift}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Kết thúc (ca sáng)</Form.Label>
                  <Form.Control
                    type="time"
                    value={formData.end_time[0]}
                    onChange={(e) =>
                      handleTimeChange(0, "end_time", e.target.value)
                    }
                    required={!isMixedShift}
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
                        value={formData.start_time[1]}
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
                        value={formData.end_time[1]}
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
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Thêm ca làm việc"}
              </Button>
            </div>

            <Link
              to="/shifts"
              className="btn btn-link mt-3 d-block text-center"
            >
              Quay lại danh sách
            </Link>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default AddShift;
