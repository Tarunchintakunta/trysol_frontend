import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <Row className="g-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>View Employees</Card.Title>
              <Card.Text>
                Access the list of all employees in the system.
              </Card.Text>
              <Card.Link href="/admin/view-employees">Go to View Employees</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>View Candidates</Card.Title>
              <Card.Text>
                Access the list of all candidates in the system.
              </Card.Text>
              <Card.Link href="/admin/view-candidates">Go to View Candidates</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Upload Candidates</Card.Title>
              <Card.Text>
                Upload candidate profiles from an Excel file.
              </Card.Text>
              <Card.Link href="/admin/upload-candidates">Go to Upload Candidates</Card.Link>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Candidates Audit</Card.Title>
              <Card.Text>
                Upload candidate profiles from an Excel file.
              </Card.Text>
              <Card.Link href="/admin/candidates-audit">Go to Upload Candidates</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AdminDashboard
