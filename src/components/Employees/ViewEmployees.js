import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Container, Form, Alert, Modal } from "react-bootstrap";
import { showToastSuccess } from "../../utils/toast/toast";
import { toast } from "react-toastify";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/trysol/employees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployees(response.data.content);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setLoading(false);
    }
  };

  const handleActivateDeactivate = async (employeeId, isActive) => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:8080/trysol/employees/${employeeId}`;

      if (isActive) {
        await axios.delete(`${url}/deactivate`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showToastSuccess(`Employee has been Deactivated with ${employeeId}`);
      } else {
        await axios.put(
          `${url}/activate`,
          { active: true },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        showToastSuccess(`Employee has been reactivated with ${employeeId}`);
      }

      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee status:", error);
    }
  };

  const handleCreateUser = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/trysol/employees",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchEmployees();
      handleCloseModal();
      alert(response.data);
    } catch (err) {
      console.error("Error creating employee:", err);
      setError("Failed to create employee. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <br></br>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}
      >
        <img
          src="data:image/jpeg;base64,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" // Placeholder link for logo
          alt="Logo"
          style={{ width: "60px", height: "60px", marginRight: "1rem" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
          }}
        ></div>
        <h2 style={{ fontWeight: "bold", color: "#343a40" }}>Employee List</h2>
      </div>

      <Button variant="primary" onClick={handleCreateUser} className="mb-3">
        Create User
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.active ? "Active" : "Inactive"}</td>
              <td>
                <Button
                  variant={employee.active ? "danger" : "success"}
                  onClick={() =>
                    handleActivateDeactivate(
                      employee.employeeId,
                      employee.active
                    )
                  }
                >
                  {employee.active ? "Deactivate" : "Activate"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showCreateModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
            </Form.Group>
            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
            </Form.Group>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="primary"
                type="submit"
                style={{ padding: "10px 20px", fontWeight: "bold" }}
              >
                Create Employee
              </Button>
              <p> </p>
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                style={{ padding: "10px 20px", fontWeight: "bold" }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EmployeeTable;
