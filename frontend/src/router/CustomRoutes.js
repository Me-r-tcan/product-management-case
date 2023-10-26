import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Login from '../pages/Login';
import { useUser } from '../contexts/UserContext';

function CustomRoutes() {
  const { user, setUser } = useUser();

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem('token');
      if (token) {
        const user = jwt_decode(token);
        setUser({ ...user, token });
      }
    }
  }, [user, setUser]);

  return (
    <Router>
      <Routes>
        <Route
          path='/login'
          element={user ? <Navigate to='/products' /> : <Login />}
        />


        <Route index element={<Navigate to='/login' />} />
      </Routes>
    </Router>
  );
}

export default CustomRoutes;
