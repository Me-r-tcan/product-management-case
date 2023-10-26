import React from 'react';
import CustomRoutes from './router/CustomRoutes';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <CustomRoutes />
    </UserProvider>
  );
}

export default App;
