import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';

const Navbar = () => {
    const user = useSelector((state) => state.user.user); // Access user from Redux store
    const token = useSelector((state) => state.user.token); // Access token from Redux store
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/'); 
        handleCloseMenu(); 
    };

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    console.log('Navbar user state after login:', user); // For debugging
    console.log('Navbar token state after login:', token); // For debugging

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2', boxShadow: 'none' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Button component={Link} to="/" sx={{ color: '#fff', fontWeight: 'bold', marginRight: 2 }}>
                        Home
                    </Button>
                    {token ? (
                        <>
                            <Button component={Link} to="/task" sx={{ color: '#fff', fontWeight: 'bold', marginRight: 2 }}>
                                Create Tasks
                            </Button>
                            <Button component={Link} to={`/task/${user?._id}`} sx={{ color: '#fff', fontWeight: 'bold', marginRight: 2 }}>
                                View Tasks
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button component={Link} to="/login" sx={{ color: '#fff', fontWeight: 'bold', marginRight: 2 }}>
                                Login
                            </Button>
                            <Button component={Link} to="/register" sx={{ color: '#fff', fontWeight: 'bold', marginRight: 2 }}>
                                Register
                            </Button>
                        </>
                    )}
                </Box>
                {token && user && (
                    <Box>
                        <Avatar sx={{ cursor: 'pointer' }} onClick={handleOpenMenu}>
                            {user.name ? user.name.charAt(0) : '?'}
                        </Avatar>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} sx={{ mt: '45px' }}>
                            <MenuItem disabled>
                                <Typography variant="body1">{user.name}</Typography>
                            </MenuItem>
                            <MenuItem disabled>
                                <Typography variant="body2">{user.email}</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
