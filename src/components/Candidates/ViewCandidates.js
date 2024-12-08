import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./ViewCandidates.css";

const ViewCandidates = () => {
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    name: "",
    skill: "",
    subSkill: "",
    location: "",
    minTotalExp: "",
    maxTotalExp: "",
    minRelExp: "",
    maxRelExp: "",
  });
  const [selectedEmails, setSelectedEmails] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const params = {
        page,
        size: pageSize,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== "")
        ),
      };

      const response = await axios.get(
        "https://3.94.171.108:8080/trysol/candidates",
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data.content);
      setTotalRecords(response.data.totalElements);
    } catch (error) {
      alert("An error occurred while fetching data. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize, filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setPage(0); // Reset to page 1 when filters change
  };

  const handleCheckboxChange = (email) => {
    setSelectedEmails((prevEmails) =>
      prevEmails.includes(email)
        ? prevEmails.filter((e) => e !== email)
        : [...prevEmails, email]
    );
  };

  const handleMassMailing = () => {
    if (selectedEmails.length > 0) {
      const mailtoLink = `mailto:?bcc=${selectedEmails.join(",")}`; // Change cc to bcc
      window.location.href = mailtoLink;
    } else {
      alert("Please select at least one candidate to email.");
    }
  };

  const handleDownload = () => {
    if (selectedEmails.length === 0) {
      alert("Please select at least one candidate to download.");
      return;
    }

    const selectedCandidates = data.filter((candidate) =>
      selectedEmails.includes(candidate.mailId)
    );

    const formattedData = selectedCandidates.map((candidate) => ({
      ID: candidate.id,
      Name: candidate.name,
      Email: candidate.mailId,
      Contact: candidate.contact,
      Skill: candidate.skill,
      SubSkill: candidate.subSkill,
      Location: candidate.location,
      TotalExperience: candidate.totalExperience,
      RelevantExperience: candidate.relevantExperience,
      NoticePeriod: candidate.noticePeriod,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    const columnHeaders = [
      { header: "ID", minWidth: 12 },
      { header: "Name", minWidth: 20 },
      { header: "Email", minWidth: 30 },
      { header: "Contact", minWidth: 20 },
      { header: "Skill", minWidth: 20 },
      { header: "SubSkill", minWidth: 20 },
      { header: "Location", minWidth: 20 },
      { header: "TotalExperience", minWidth: 15 },
      { header: "RelevantExperience", minWidth: 15 },
      { header: "Notice Period", minWidth: 15 },
    ];

    worksheet["!cols"] = columnHeaders.map((col) => {
      const maxLength = Math.max(
        ...formattedData.map(
          (row) => (row[col.header]?.toString().length || 0) + 2
        )
      );
      return { wch: Math.max(col.minWidth, maxLength) };
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
    XLSX.writeFile(workbook, "Selected_Candidates.xlsx");
  };

  const handleResetFilters = () => {
    setFilters({
      name: "",
      skill: "",
      subSkill: "",
      location: "",
      minTotalExp: "",
      maxTotalExp: "",
      minRelExp: "",
      maxRelExp: "",
    });
    setPage(0); // Reset to page 1
    setSelectedEmails([]); // Clear selected emails
  };

  const calculateRemainingDays = (noticeDate) => {
    const today = new Date();
    const noticeDateObj = new Date(noticeDate.split("-").reverse().join("-")); // assuming format is DD-MM-YYYY
    const diffTime = noticeDateObj - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days remaining` : "Notice period ended";
  };

  return (
    <div className="search-container">
      <h2>Search Candidates</h2>

      <div className="filters">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="skill"
          placeholder="Skill"
          value={filters.skill}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="subSkill"
          placeholder="Sub Skill"
          value={filters.subSkill}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="minTotalExp"
          placeholder="Min Total Exp"
          value={filters.minTotalExp}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxTotalExp"
          placeholder="Max Total Exp"
          value={filters.maxTotalExp}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="minRelExp"
          placeholder="Min Rel Exp"
          value={filters.minRelExp}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxRelExp"
          placeholder="Max Rel Exp"
          value={filters.maxRelExp}
          onChange={handleFilterChange}
        />
      </div>

      <button onClick={handleResetFilters} className="reset-button">
        Reset Filters
      </button>

      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Skill</th>
            <th>Sub Skill</th>
            <th>Location</th>
            <th>Total Exp</th>
            <th>Rel Exp</th>
            <th>Notice period</th>
            <th>Remaining Days</th>
          </tr>
        </thead>
        <tbody>
          {data.map((candidate) => (
            <tr key={candidate.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedEmails.includes(candidate.mailId)}
                  onChange={() => handleCheckboxChange(candidate.mailId)}
                />
              </td>
              <td>{candidate.id}</td>
              <td>{candidate.name}</td>
              <td>{candidate.mailId}</td>
              <td>{candidate.contact}</td>
              <td>{candidate.skill}</td>
              <td>{candidate.subSkill}</td>
              <td>{candidate.location}</td>
              <td>{candidate.totalExperience}</td>
              <td>{candidate.relevantExperience}</td>
              <td>{candidate.noticePeriod}</td>
              <td>{calculateRemainingDays(candidate.noticePeriod)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous
        </button>
        <span>Page {page + 1}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={(page + 1) * pageSize >= totalRecords}
        >
          Next
        </button>
      </div>

      <div className="button-container">
        <button onClick={handleMassMailing} className="mass-mailing-button">
          Mass Mailing
        </button>
        <button onClick={handleDownload} className="download-button">
          Download
        </button>
      </div>
    </div>
  );
};

export default ViewCandidates;
