import { Route, Routes, Navigate } from "react-router-dom";

import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import AppLayout from "../components/layout/layout";
import UsersList from "../pages/master/userList"
import ProjectList from "../pages/project/projectList"
import ProjectTypeList from "../pages/project/projectTypeList"
import ProtectedRoute from "./components/ProtectedRoute";
function AdminRouter() {
  return (
    <Routes>
      {/* 🟢 Default Route → Always open Login page */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 🟠 Login Page */}
      <Route path="/login" element={<Login />} />

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
      </Route>

      {/* 🔴 Any wrong route → Redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
export default AdminRouter;
