// src/pages/Home.js
import React from 'react';
import { Typography, Container, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '80vh', // Set a minimum height instead of full height
        paddingTop: '20px', // Add some top padding to adjust spacing
      }}
    >
      <Typography variant="h2" gutterBottom align="center">
        Welcome to Task Management App
      </Typography>
      <Typography variant="h6" gutterBottom align="center">
        Manage your tasks efficiently and effectively.
      </Typography>
      <Box>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/register" 
          sx={{ marginRight: '10px' }} // Use sx for consistent styling
          aria-label="Register" // Accessibility improvement
        >
          Register
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          component={Link} 
          to="/login"
          aria-label="Login" // Accessibility improvement
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
