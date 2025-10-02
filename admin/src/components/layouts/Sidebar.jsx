import { ListGroup, Offcanvas } from "react-bootstrap";
import {
  FaBell,
  FaCalendarCheck,
  FaClock,
  FaCog,
  FaGift,
  FaRegCalendarTimes,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

const Sidebar = ({
  showSidebar,
  handleCloseSidebar,
  showProfile,
  handleCloseProfile,
}) => {
  return (
    <>
      <div
        className="d-none d-md-block p-3"
        style={{
          width: "250px",
          height: "100vh",
          background: "#2f897d",
          color: "white",
        }}
      >
        {/* Logo căn giữa */}
        <div className="d-flex justify-content-center mb-3">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ maxWidth: "150px", height: "auto" }}
          />
        </div>
        <h4 className="text-center mb-4">Quản lý nhà hàng</h4>
        <ListGroup variant="flush">
          <ListGroup.Item
            action
            href="/"
            className="bg-dark text-white"
          >
            <FaTachometerAlt className="me-2" />
            Dashboard
          </ListGroup.Item>

          <ListGroup.Item action href="/staffs" className="bg-dark text-white">
            <FaUsers className="me-2" />
            Quản lý nhân viên
          </ListGroup.Item>

          <ListGroup.Item
            action
            href="#attendance"
            className="bg-dark text-white"
          >
            <FaCalendarCheck className="me-2" />
            Điểm danh
          </ListGroup.Item>

          <ListGroup.Item
            action
            href="#timesheet"
            className="bg-dark text-white"
          >
            <FaClock className="me-2" />
            Chấm công
          </ListGroup.Item>

          <ListGroup.Item action href="#leave" className="bg-dark text-white">
            <FaRegCalendarTimes className="me-2" />
            Lý do nghỉ phép
          </ListGroup.Item>

          <ListGroup.Item action href="#bonus" className="bg-dark text-white">
            <FaGift className="me-2" />
            Thưởng | Phạt
          </ListGroup.Item>

          <ListGroup.Item action href="#notice" className="bg-dark text-white">
            <FaBell className="me-2" />
            Thông báo
          </ListGroup.Item>

          <ListGroup.Item
            action
            href="#settings"
            className="bg-dark text-white"
          >
            <FaCog className="me-2" />
            Cài đặt
          </ListGroup.Item>
        </ListGroup>
      </div>

      {/* Sidebar mobile */}
      <Offcanvas show={showSidebar} onHide={handleCloseSidebar}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            <ListGroup.Item action href="/">
              Dashboard
            </ListGroup.Item>
            <ListGroup.Item action href="#users">
              Quản lý nhân viên
            </ListGroup.Item>
            <ListGroup.Item action href="#attendance">
              Điểm danh
            </ListGroup.Item>
            <ListGroup.Item action href="#timesheet">
              Chấm công
            </ListGroup.Item>
            <ListGroup.Item action href="#leave">
              Lý do nghỉ phép
            </ListGroup.Item>
            <ListGroup.Item action href="#bonus">
              Thưởng | Phạt
            </ListGroup.Item>
            <ListGroup.Item action href="#notice">
              Thông báo
            </ListGroup.Item>
            <ListGroup.Item action href="#settings">
              Settings
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Profile Offcanvas - mobile */}
      <Offcanvas show={showProfile} onHide={handleCloseProfile} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tài khoản</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            <ListGroup.Item action href="#profile">
              Thông tin cá nhân
            </ListGroup.Item>
            <ListGroup.Item action href="#logout">
              Đăng xuất
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
