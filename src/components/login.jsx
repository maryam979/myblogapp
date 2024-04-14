// Login.jsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }


    
    axios.post('http://localhost:3000/api/users/login', { username, password })
    .then((response) => {
      const { token, user } = response.data; 
      login(token, user);
      navigate('/profile');
    })
    .catch((error) => {
      console.error('Failed to login:', error);

      if (error.response && error.response.status === 401) {
        setError('Incorrect username or password.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    });
};

  return (
    <>
      {error && (
        <Alert severity="warning">
          {error}
        </Alert>
      )}
      <Box
        height={400}
        width={300}
        my={2}
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="flex-start"
        spacing={1}
        gap={4}
        p={2}
        sx={{ border: '2px solid grey' }}
      >
        <TextField 
          id="username" 
          label="Username" 
          variant="standard" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <TextField 
          id="password" 
          label="Password" 
          variant="standard" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button 
          variant="outlined" 
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </>
  );
}

export default Login;
