// src/pages/Upload.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Alert, Container } from 'react-bootstrap';

const UploadCandidates = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('danger'); // To handle the color of the alert
  const [duplicates, setDuplicates] = useState([]); // State to hold duplicates
  const [totalDuplicatesSkipped, setTotalDuplicatesSkipped] = useState(0); // State for total duplicates skipped

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file =>
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
      file.type === 'application/vnd.ms-excel'
    );

    if (validFiles.length !== selectedFiles.length) {
      setMessage('Please select only valid Excel files (.xlsx or .xls)');
      setVariant('danger');
      setFiles([]);
      setDuplicates([]);
      setTotalDuplicatesSkipped(0);
    } else {
      setFiles(validFiles);
      setMessage('');
      setDuplicates([]);
      setTotalDuplicatesSkipped(0);
    }
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    if (files.length === 0) {
      setMessage('No files selected');
      setVariant('danger');
      return;
    }
  
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
  
    try {
      const response = await axios.post('http://localhost:8080/trysol/candidates/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log(response.data.duplicatesSkipped)
      setMessage(response.data.message); // Set the success message
      setVariant('success');
  
      // Check if data exists in the response
      if (response.data) {
        setDuplicates(response.data.duplicatesSkipped || []); // Set duplicates or empty array if undefined
        setTotalDuplicatesSkipped(response.data.totalDuplicatesSkipped || 0); // Set total duplicates skipped or 0 if undefined
      } else {
        // Handle case where data is not available
        setDuplicates([]);
        setTotalDuplicatesSkipped(0);
      }
    } catch (error) {
      setMessage('Failed to upload files: ' + (error.response?.data?.message || error.message));
      setVariant('danger');
      console.error(error);
    }
  };
  

  return (
    <Container className="upload-container">
      <h2>Upload Excel Files</h2>
      <Form onSubmit={handleUpload} className="upload-form">
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Select Excel files</Form.Label>
          <Form.Control 
            type="file" 
            accept=".xlsx,.xls" 
            onChange={handleFileChange} 
            multiple 
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Upload
        </Button>
      </Form>
      {message && <Alert variant={variant} className="mt-3">{message}</Alert>}
      {totalDuplicatesSkipped > 0 && (
        <Alert variant="warning" className="mt-3">
          <h5>{totalDuplicatesSkipped} Duplicates Skipped:</h5>
          <ul>
            {duplicates.map((dup, index) => (
              <li key={index}>{dup.trim()}</li>
            ))}
          </ul>
        </Alert>
      )}
    </Container>
  );
};

export default UploadCandidates;
