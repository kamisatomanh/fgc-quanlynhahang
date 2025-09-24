import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ handleShowSidebar, handleShowProfile }) => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-3">
      {/* Sidebar toggle chỉ mobile */}
      <Button
        variant="outline-secondary"
        className="d-md-none me-2"
        onClick={handleShowSidebar}
      >
        ☰
      </Button>

      <Navbar.Brand href="#home">ADMIN</Navbar.Brand>

      <div className="ms-auto">
        {/* Profile button chỉ hiện mobile */}
        <Button
          variant="outline-secondary"
          className="d-md-none"
          onClick={handleShowProfile}
        >
          <FaUserCircle size={22} />
        </Button>

        {/* Menu desktop */}
        <Nav className="d-none d-md-flex">
          <Nav.Link href="#profile">Thông tin cá nhân</Nav.Link>
          <Nav.Link href="#logout">Đăng xuất</Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;
