import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
    const { user, setUser } = useUser(); // Access user and setUser from context
    console.log(user, "888888888888888888888")
    const navigate = useNavigate(); // Hook to programmatically navigate

    const [anchorEl, setAnchorEl] = useState(null); // State for the menu anchor element

    const handleLogout = () => {
        setUser(null); // Clear user data
        navigate('/'); // Redirect to home page
        handleCloseMenu(); // Close the menu after logout
    };

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget); // Set the anchor element to open the menu
    };

    const handleCloseMenu = () => {
        setAnchorEl(null); // Close the menu
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2', boxShadow: 'none' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Button component={Link} to="/" sx={{ color: '#fff', fontWeight: 'bold', marginRight: 2 }}>
                        Home
                    </Button>
                    {/* Show Create Tasks button only if user is logged in */}
                    {user ? (
                        <>
                            <Button component={Link} to="/task" sx={{ color: '#fff', fontWeight: 'bold', marginRight: 2 }}>
                                Create Tasks
                            </Button>
                            <Button
                                component={Link}
                                to={`/task/${user.id}`}
                                sx={{ color: '#fff', fontWeight: 'bold', marginRight: 2 }}
                            >
                                View Tasks
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                component={Link}
                                to="/login"
                                sx={{ color: '#fff', fontWeight: 'bold', marginRight: 2 }}
                            >
                                Login
                            </Button>
                            <Button
                                component={Link}
                                to="/register"
                                sx={{ color: '#fff', fontWeight: 'bold', marginRight: 2 }}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </Box>
                {/* Profile icon positioned to the right */}
                {user && (
                    <Box>
                        <Avatar
                            sx={{ cursor: 'pointer' }}
                            onClick={handleOpenMenu}
                        >
                            {user.name ? user.name.charAt(0) : '?' /* Display the first letter of the user's name */}
                        </Avatar>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                            sx={{ mt: '45px' }}
                        >
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
