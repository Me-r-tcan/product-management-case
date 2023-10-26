import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import useHttpRequest from '../hooks/useHttpRequest';
import { useUser } from '../contexts/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data, loading, error, sendRequest } = useHttpRequest();
  const { setUser } = useUser();

  useEffect(() => {
    if (data) {
      const { token } = data;
      const user = jwt_decode(token);
      localStorage.setItem('token', token);
      setUser({ ...user, token });
    }
  }, [data, setUser]);

  const handleLogin = () => {
    sendRequest('http://localhost:3000/api/auth', 'POST', {
      email,
      password,
    });
  };

  return (
    <Container maxWidth='sm'>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Typography variant='h4' component='h2'>
          Login
        </Typography>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <CircularProgress />
        </div>
      ) : (
        <form>
          <TextField
            label='Email'
            fullWidth
            margin='normal'
            variant='outlined'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type='password'
            label='Password'
            fullWidth
            margin='normal'
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleLogin}
            style={{ marginTop: '1rem' }}
          >
            Login
          </Button>
        </form>
      )}
      {error && (
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'red' }}>
          An error occurred: {error}
        </div>
      )}
    </Container>
  );
}

export default Login;
