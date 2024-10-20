import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice'; // Import the login action from Redux slice

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationSeverity, setNotificationSeverity] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await dispatch(login({ email, password })); // Dispatch the login action with credentials

            if (response.payload.token) {
                setNotificationMessage('Login successful');
                setNotificationSeverity('success');
                navigate(`/task/${response.payload.user._id}`);
            } else if (response.payload.message) {
                setNotificationMessage(response.payload.message);
                setNotificationSeverity('error');
            }
            setOpenSnackbar(true);

        } catch (error) {
            console.error('Error during login:', error);
            setNotificationMessage('Login failed. Please try again.');
            setNotificationSeverity('error');
            setOpenSnackbar(true);
        }

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
                    Login
                </Typography>

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
                    Login
                </Button>
            </Box>

            <Snackbar
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                message={notificationMessage}
                autoHideDuration={6000}
                severity={notificationSeverity}
            />
        </Container>
    );
};

export default LoginForm;
