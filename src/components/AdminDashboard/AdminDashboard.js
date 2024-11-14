import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (card) => setHoveredCard(card);
  const handleMouseLeave = () => setHoveredCard(null);

  const handleCardClick = (link) => navigate(link);

  const containerStyle = {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  };

  const cardBaseStyle = {
    width: "280px",
    height: "180px",
    background: "#1e2b33",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    transition: "transform 0.4s, box-shadow 0.4s",
    color: "#fff",
    textAlign: "center",
    cursor: "pointer",
    padding: "20px",
    textDecoration: "none",
    transform: hoveredCard ? "scale(1.05)" : "scale(1)",
  };

  const borderStyle = (isHovered) => ({
    position: "absolute",
    inset: isHovered ? "8px" : "0px",
    border: "2px solid #bd9f67",
    opacity: isHovered ? 1 : 0,
    transform: isHovered ? "rotate(0)" : "rotate(5deg)",
    transition: "all 0.5s ease-in-out",
    borderRadius: "10px",
  });

  const titleStyle = {
    fontSize: "1.3rem",
    fontWeight: "bold",
  };

  const descriptionStyle = (isHovered) => ({
    fontSize: "1rem",
    color: "#bd9f67",
    marginBottom: "10px",
    opacity: isHovered ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
  });

  const linkStyle = (isHovered) => ({
    color: "#bd9f67",
    fontWeight: "500",
    fontSize: "0.9rem",
    opacity: isHovered ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
    textDecoration: "none",
  });

  const cards = [
    {
      id: "employees",
      title: "View Employees",
      description: "Access the list of all employees in the system.",
      link: "/admin/view-employees",
    },
    {
      id: "candidates",
      title: "View Candidates",
      description: "Access the list of all candidates in the system.",
      link: "/admin/view-candidates",
    },
    {
      id: "upload",
      title: "Upload Candidates",
      description: "Upload candidate profiles from an Excel file.",
      link: "/admin/upload-candidates",
    },
    {
      id: "audit",
      title: "Candidates Audit",
      description: "Audit the uploaded candidate profiles.",
      link: "/admin/candidates-audit",
    },
  ];

  return (
    <Container style={containerStyle}>
      <h2 style={{ fontWeight: "bold", color: "#243137", textAlign: "center", marginBottom: "2rem" }}>
        Admin Dashboard
      </h2>
      <Row className="justify-content-center" style={{ gap: "1.5rem" }}>
        {cards.map((card) => (
          <Col
            key={card.id}
            style={cardBaseStyle}
            onMouseEnter={() => handleMouseEnter(card.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCardClick(card.link)}
          >
            <div style={borderStyle(hoveredCard === card.id)} />
            <div style={titleStyle}>{card.title}</div>
            <p style={descriptionStyle(hoveredCard === card.id)}>{card.description}</p>
            <a href={card.link} style={linkStyle(hoveredCard === card.id)}>
              Learn More
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminDashboard;

