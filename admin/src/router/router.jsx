<Routes>
  {/* Default */}
  <Route path="/admin/login" element={<Navigate to="/login" replace />} />

  {/* Login */}
  <Route path="/login" element={<Login />} />

  {/* Protected Routes */}
  <Route
    path="/*"
    element={
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Dashboard />} />
    <Route path="master/userlist" element={<UsersList />} />
    <Route path="project/projectlist" element={<ProjectList />} />
    <Route path="project/projecttypelist" element={<ProjectTypeList />} />
  </Route>

  {/* Invalid Route */}
  <Route path="*" element={<Navigate to="/admin/login" replace />} />
</Routes>