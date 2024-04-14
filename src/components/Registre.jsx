import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, TextField, Link } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

function Register() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !password || !email) {
            setError('All Fields Are Required');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/api/users/profile', { username, email, password });
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            setIsAuth(true);
            navigate('/');
        } catch (error) {
            console.error('Failed to register:', error);
        }
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
                    id="email"
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onClick={handleRegister}
                >
                    Register
                </Button>
                <Link to="/">Already have an account? Login here</Link>
            </Box>
        </>
    );
}

export default Register;
