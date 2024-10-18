import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Snackbar } from '@mui/material';
import { registerUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await registerUser({ name, email, password });

        console.log('Registration Response:', response); // Debugging output

        // Check if registration was successful
        if (response) {
            if (response.message === 'User registered successfully') {
                setSuccessMessage(response.message);
                setErrorMessage('');
                setOpenSnackbar(true); // Open Snackbar

                // Delay navigation to allow Snackbar to show
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page on success
                }, 2000); // 2 seconds delay
            } else {
                setErrorMessage(response.message); // Show the error message
                setSuccessMessage('');
                setOpenSnackbar(true); // Open Snackbar
            }
        }

        // Clear input fields
        setName('');
        setEmail('');
        setPassword('');
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm">
            <Box 
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 5,
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: '#f9f9f9',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                />
                
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                />
                
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                />
                
                <Button 
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{
                        mt: 2,
                        backgroundColor: '#1976d2',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                    }}
                >
                    Register
                </Button>
            </Box>

            <Snackbar
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                message={successMessage || errorMessage} // Show success or error message
                autoHideDuration={6000} // Hide after 6 seconds
            />
        </Container>
    );
};

export default RegisterForm;
