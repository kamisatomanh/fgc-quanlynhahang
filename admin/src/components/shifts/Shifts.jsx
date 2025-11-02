import React, { useState } from "react";
import { useShifts } from "../../hooks/useShifts";
import { useNavigate } from "react-router-dom";
import { Button, Container, Modal, Table } from "react-bootstrap";

const Shifts = () => {
  const { shifts, loading, error, deleteShift } = useShifts();

  const [showModal, setShowModal] = useState(false);

  const [selectedShiftId, setSelectedShiftId] = useState(null);
  const navigate = useNavigate();

  const handleShowModal = (id) => {
    setSelectedShiftId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedShiftId) {
      await deleteShift(selectedShiftId);
      setShowModal(false);
      selectedShiftId(null);
    }
  };

  console.log(shifts, loading, error);

  return (
    <Container className="mt-4">
      <h4 className="mb-3">Danh sách ca làm việc</h4>
      <Button
        onClick={() => navigate("/shifts/add-shift")}
        className="mb-3"
        variant="primary"
      >
        Thêm ca làm việc
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Mã ca làm</th>
            <th>Ca làm</th>
            <th>Hiệu lực bắt đầu</th>
            <th>Hiệu lục kết thúc</th>
            <th>Thời gian bắt đầu</th>
            <th>Thời gian kết thúc</th>
            <th>Hành động</th>
          </tr>
        </thead>

        {loading ? (
          <tbody>
            <tr>
              <td colSpan="6" className="text-center">
                <div className="spinner-border text-danger" role="status">
                  <span className="sr-only"></span>
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {shifts.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.shift_name}</td>
                <td>{item.effective_from}</td>
                <td>{item.effective_to}</td>
                <td>{item.start_time}</td>
                <td>{item.end_time}</td>
                <td>
                  <button
                    onClick={() => navigate(`/shifts/edit-shift/${item.id}`)}
                    className="btn btn-warning text-white me-2"
                  >
                    Sửa
                  </button>

                  <Button
                    onClick={() => handleShowModal(item.id)} // ✅ truyền id vào đây
                    variant="danger"
                    size="sm"
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>

      {/* ✅ Modal xác nhận xóa */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa ca làm này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Shifts;
