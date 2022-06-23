import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../pages/homepage';
import CatchAllRoutes from './CatchAllRoutes';
import Layout from './Layout';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PublicRoutes />}>
          <Route path="welcome" element={<Homepage />} />
          {/* <Route path="auth">
            <Route path="signin" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route> */}
        </Route>

        <Route element={<ProtectedRoutes />}>
          {/* <Route path="tasks" element={<Tasks />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="invoices" element={<Invoices />} /> */}
        </Route>

        <Route path="*" element={<CatchAllRoutes />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
