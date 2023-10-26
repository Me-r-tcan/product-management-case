import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Login from '../pages/Login';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
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
          index
          path='/'
          element={user ? <Navigate to='/products' /> : <Login />}
        />

        <Route
          path='/products'
          element={
            user ? (
              <ProductList username={user.username} />
            ) : (
              <Navigate to='/' />
            )
          }
        />

        <Route
          path='/products/:productId'
          element={user ? <ProductDetail /> : <Navigate to='/' />}
        />
      </Routes>
    </Router>
  );
}

export default CustomRoutes;
