import React, { useState } from 'react';
import { loginUser } from '../api/authApi';
import { TextField, Button, Container, Typography, Box, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { useUser } from '../context/UserContext';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationSeverity, setNotificationSeverity] = useState(''); // 'success' or 'error'
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser({ email, password });
        console.log(response,"3333333333333333333333"); 
        console.log(response.user._id,"yyyyyyyyyyyyyyyyyyyyyyyyy")// Handle login response

        if (response) {
            if (response.token) { 
                setUser({ id: response.user._id, token: response.token, name:response.user.name, email:response.user.email });// Assuming you return a token on successful login
                setNotificationMessage('Login successful');
                setNotificationSeverity('success');
                navigate(`/task/${response.user._id}`) 
            } else if (response.message) {
                setNotificationMessage(response.message); // Assuming the message is in response
                setNotificationSeverity('error');
            }
            setOpenSnackbar(true); // Open Snackbar
        }

        // Clear input fields
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
                autoHideDuration={6000} // Snackbar will hide after 6 seconds
                severity={notificationSeverity} // Use for styling based on success/error
            />
        </Container>
    );
};

export default LoginForm;
