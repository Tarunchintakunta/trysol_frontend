import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Container, Form, Alert } from 'react-bootstrap';
import Modal from 'react-modal'; // Import react-modal
import { showToastSuccess } from '../../utils/toast/toast';
import { toast } from 'react-toastify';

// Set up the modal root element
Modal.setAppElement('#root');

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/trysol/employees', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEmployees(response.data.content);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };

  const handleActivateDeactivate = async (employeeId, isActive) => {
    try {
      const token = localStorage.getItem('token');
      const url = `http://localhost:8080/trysol/employees/${employeeId}`;
      
      // Use DELETE for deactivation and PUT for activation
      if (isActive) {
        // Deactivate the employee
        await axios.delete(`${url}/deactivate`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        showToastSuccess(`Employee has been Deactivated with ${employeeId}`);
      } else {
        // Activate the employee
        await axios.put(`${url}/activate`, { active: true }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        showToastSuccess(`Employee has been re activated with ${employeeId}`);
      }
      
      fetchEmployees(); // Refresh the employee list
    } catch (error) {
      console.error('Error updating employee status:', error);
    }
  };

  const handleCreateUser = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response=await axios.post('http://localhost:8080/trysol/employees', {
        firstName,
        lastName,
        email,
        password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchEmployees(); // Refresh the employee list
      handleCloseModal(); // Close the modal after submission
      alert(response.data);
    } catch (err) {
      console.error('Error creating employee:', err);
      setError('Failed to create employee. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2>Employee List</h2>
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
              <td>{employee.active ? 'Active' : 'Inactive'}</td>
              <td>
                <Button
                  variant={employee.active ? 'danger' : 'success'}
                  onClick={() => handleActivateDeactivate(employee.employeeId, employee.active)}
                >
                  {employee.active ? 'Deactivate' : 'Activate'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create Employee Modal */}
      <Modal
        isOpen={showCreateModal}
        onRequestClose={handleCloseModal}
        contentLabel="Create Employee"
      >
        <h2>Create Employee</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName" className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter first name" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formLastName" className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter last name" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Employee
          </Button>
          <Button variant="secondary" onClick={handleCloseModal} className="ms-2">
            Cancel
          </Button>
        </Form>
      </Modal>
    </Container>
  );
};

export default EmployeeTable;
