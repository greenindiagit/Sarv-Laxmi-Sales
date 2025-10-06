import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import AppLayout from "./components/layout/layout";
import Dashboard from "./pages/dashboard/Dashboard";
import UsersList from "./pages/master/userList";
import ProjectList from "./pages/project/projectList";
import ProjectTypeList from "./pages/project/projectTypeList";
import ProtectedRoute from "./context/ProtectedRoute";
import Profile from "./pages/profile/profile";
import RequestReset from "./pages/password-reset/RequestReset";
import ResetPassword from "./pages/password-reset/ResetPassword";
import "./App.css";


function App() {
  return (
    <Routes>
      {/* 🟢 Default Route → Always open Login page */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 🟠 Login Page */}
      <Route path="/login" element={<Login />} />
      <Route path="/request-reset" element={<RequestReset />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* 🔵 Protected Admin Routes (only after login) */}
      <Route
        path="/Admin/*"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="Master/UserList" element={<UsersList />} />
        <Route path="Project/ProjectList" element={<ProjectList />} />
        <Route path="Project/ProjectTypeList" element={<ProjectTypeList />} />
        <Route path="Profile" element={<Profile />} />
      </Route>

      {/* 🔴 Any wrong route → Redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
