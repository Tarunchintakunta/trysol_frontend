import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Container, Pagination, Dropdown } from 'react-bootstrap';

const AuditTable = () => {
  const [audits, setAudits] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10); 
  const [sortOrder, setSortOrder] = useState('ASC'); 

  useEffect(() => {
    fetchAudits(currentPage, pageSize, sortOrder);
  }, [currentPage, pageSize, sortOrder]);

  const fetchAudits = async (page, size, order) => {
    try{
      const response = await axios.get( "https://13.53.126.195:8080/trysol/candidates/audits?page=${page}&size=${size}&sortBy=uploadDateTime&direction=${order}", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setAudits(response.data.content);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching audits:', error);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(0); 
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setCurrentPage(0); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2>Audit List</h2>

      {/* Page Size Dropdown */}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Items per page: {pageSize}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {[5, 10, 20, 50].map(size => (
            <Dropdown.Item key={size} onClick={() => handlePageSizeChange(size)}>
              {size}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <div className="mb-3">
        <Button variant={sortOrder === 'ASC' ? 'primary' : 'secondary'} onClick={() => handleSortOrderChange('ASC')}>
          Sort Ascending
        </Button>
        <Button variant={sortOrder === 'DESC' ? 'primary' : 'secondary'} onClick={() => handleSortOrderChange('DESC')}>
          Sort Descending
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Uploader Name</th>
            <th>Upload Date</th>
            <th>Inserted Rows</th>
            <th>Skipped Rows</th>
          </tr>
        </thead>
        <tbody>
          {audits.map(audit => (
            <tr key={audit.id}>
              <td>{audit.id}</td>
              <td>{audit.uploaderName}</td>
              <td>{new Date(audit.uploadDateTime).toLocaleString()}</td>
              <td>{audit.insertedRows}</td>
              <td>{audit.skippedRows}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index} active={index === currentPage} onClick={() => handlePageChange(index)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default AuditTable;
