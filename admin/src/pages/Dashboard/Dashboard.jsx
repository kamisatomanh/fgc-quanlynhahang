import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const Dashboard = () => {
  return (
    <>
      <Row>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>1,245</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Orders</Card.Title>
              <Card.Text>320</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Revenue</Card.Title>
              <Card.Text>$12,500</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Sales Chart</Card.Title>
              <div style={{ height: "250px", background: "#f8f9fa" }}>
                <p className="text-center mt-5">[Chart here]</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Recent Activities</Card.Title>
              <ul>
                <li>User John registered</li>
                <li>Order #123 placed</li>
                <li>Payment of $500 received</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
