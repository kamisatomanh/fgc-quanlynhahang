import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Nav,
  Navbar,
  Offcanvas,
  Row,
} from "react-bootstrap";
import {
  FaUserCircle,
  FaTimesCircle,
  FaCog,
  FaBell,
  FaGift,
  FaRegCalendarTimes,
  FaClock,
  FaCalendarCheck,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Main = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);

  const handleCloseProfile = () => setShowProfile(false);
  const handleShowProfile = () => setShowProfile(true);
  return (
    <div className="d-flex">
      <Sidebar
        showProfile={showProfile}
        showSidebar={showSidebar}
        handleCloseProfile={handleCloseProfile}
        handleCloseSidebar={handleCloseSidebar}
      />

      {/* Main content */}
      <div className="flex-grow-1">
        {/* Navbar */}
        <Header
          handleShowSidebar={handleShowSidebar}
          handleShowProfile={handleShowProfile}
        />

        {/* Dashboard Content */}
        <Container fluid className="mt-4">
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default Main;
