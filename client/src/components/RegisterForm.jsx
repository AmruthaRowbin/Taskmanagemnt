import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import { registerUser } from '../api/userapi';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false); // To disable the button during form submission
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Disable the button during submission

        try {
            const response = await registerUser({ name, email, password });

            console.log('Registration Response:', response); // Debugging output

            if (response && response.message === 'User registered successfully') {
                setSuccessMessage(response.message);
                setErrorMessage('');
                setOpenSnackbar(true); // Show Snackbar for success

                // Clear input fields only on successful registration
                setName('');
                setEmail('');
                setPassword('');

                // Delay navigation to allow Snackbar to show
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page on success
                }, 2000); // 2 seconds delay
            } else {
                setErrorMessage(response.message || 'Registration failed. Please try again.'); // Show error message
                setSuccessMessage('');
                setOpenSnackbar(true); // Show Snackbar for error
            }
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again later.');
            setSuccessMessage('');
            setOpenSnackbar(true); // Show Snackbar for errors
        } finally {
            setLoading(false); // Re-enable the button
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false); // Close Snackbar
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
                    disabled={loading || !name || !email || !password} // Disable when loading or fields are empty
                    sx={{
                        mt: 2,
                        backgroundColor: loading ? '#b0bec5' : '#1976d2', // Change color when loading
                        '&:hover': {
                            backgroundColor: loading ? '#b0bec5' : '#1565c0',
                        },
                    }}
                >
                    {loading ? 'Registering...' : 'Register'}
                </Button>
            </Box>

            {/* Snackbar with different messages for success and error */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={successMessage ? 'success' : 'error'} // Success or error based on message
                    sx={{ width: '100%' }}
                >
                    {successMessage || errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default RegisterForm;
