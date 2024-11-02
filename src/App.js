import { Routes, Route, Navigate } from 'react-router-dom';
import ViewCandidates from './components/Candidates/ViewCandidates';
import UploadCandidates from './components/Candidates/UploadCandidates';
import Profile from './components/Profile/Profile';
import CandidatesAudit from './components/Candidates/CandidatesAudit';
import CreateEmployee from './components/Employees/CreateEmployee';
import ViewEmployee from './components/Employees/ViewEmployees';
import Login from './components/Login/Login';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import UserDashboard from './components/UserDashboard/UserDashboard';

const App = () => {
  // Retrieve the role from local storage
  const role = localStorage.getItem('role');

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {role === 'ROLE_ADMIN' && (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/view-candidates" element={<ViewCandidates />} />
            <Route path="/admin/upload-candidates" element={<UploadCandidates />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/candidates-audit" element={<CandidatesAudit />} />
            <Route path="/admin/create-employee" element={<CreateEmployee />} />
            <Route path="/admin/view-employees" element={<ViewEmployee />} />
          </>
        )}

        {role === 'ROLE_USER' && (
          <>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/view-candidates" element={<ViewCandidates />} />
            <Route path="/user/upload-candidates" element={<UploadCandidates />} />
            <Route path="/user/profile" element={<Profile />} />
          </>
        )}

        {/* Redirect to login for any other paths */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
