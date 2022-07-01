import Tasks from 'pages/tasks';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from '../pages/auth/forgot-password';
import Signin from '../pages/auth/signin';
import Signup from '../pages/auth/signup';
import Homepage from '../pages/homepage';
import Notes from '../pages/notes';
import Projects from '../pages/projects';
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
          <Route path="auth">
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="projects/:status" element={<Projects />} />
          <Route path="tasks/:projectId" element={<Tasks />} />
          <Route path="notes" element={<Notes />} />
        </Route>

        <Route path="*" element={<CatchAllRoutes />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
