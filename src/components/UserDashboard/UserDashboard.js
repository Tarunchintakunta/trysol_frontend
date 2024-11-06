import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDashboard = () => {
  const dashboardStyles = {
    container: {
      padding: "20px",
      backgroundColor: "#f0f2f5",
      minHeight: "100vh",
    },
    title: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#007bff",
      fontWeight: "bold",
    },
    card: {
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      border: "none",
      borderRadius: "10px",
      transition: "transform 0.2s",
    },
    cardHover: {
      transform: "scale(1.02)",
    },
    cardBody: {
      textAlign: "center",
    },
    cardTitle: {
      color: "#343a40",
      fontSize: "18px",
      fontWeight: "bold",
    },
    cardText: {
      color: "#6c757d",
    },
    cardLink: {
      color: "#ffffff",
      backgroundColor: "#007bff",
      padding: "8px 16px",
      borderRadius: "5px",
      textDecoration: "none",
    },
  };

  return (
    
    <div style={dashboardStyles.container}>
      <h2 style={dashboardStyles.title}>User Dashboard</h2>
      <Row className="g-4 center">
        <Col md={4}>
          <Card
            style={dashboardStyles.card}
            className="hover-effect"
            onMouseEnter={(e) =>
              (e.currentTarget.style = {
                ...dashboardStyles.card,
                ...dashboardStyles.cardHover,
              })
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style = { ...dashboardStyles.card })
            }
          >
            <Card.Body style={dashboardStyles.cardBody}>
              <Card.Title style={dashboardStyles.cardTitle}>
                View Candidates
              </Card.Title>
              <Card.Text style={dashboardStyles.cardText}>
                Access the list of all candidates in the system.
              </Card.Text>
              <Card.Link
                href="/user/view-candidates"
                style={dashboardStyles.cardLink}
              >
                Go to View Candidates
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            style={dashboardStyles.card}
            className="hover-effect"
            onMouseEnter={(e) =>
              (e.currentTarget.style = {
                ...dashboardStyles.card,
                ...dashboardStyles.cardHover,
              })
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style = { ...dashboardStyles.card })
            }
          >
            <Card.Body style={dashboardStyles.cardBody}>
              <Card.Title style={dashboardStyles.cardTitle}>
                Upload Candidates
              </Card.Title>
              <Card.Text style={dashboardStyles.cardText}>
                Upload candidate profiles from an Excel file.
              </Card.Text>
              <Card.Link
                href="/user/upload-candidates"
                style={dashboardStyles.cardLink}
              >
                Go to Upload Candidates
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;
