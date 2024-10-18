import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        const { token } = response.data; 
        localStorage.setItem('token', token);
        console.log('Token stored:', token);
        return response.data; 
        
    } catch (error) {
        console.error('Error logging in:', error);

        // Return error response if available
        if (error.response) {
            return { message: error.response.data.message || 'An error occurred during login.' };
        } else {
            return { message: 'Network error. Please try again.' };
        }
    }
}

export const registerUser = async (userData) => {
    console.log(userData, "iiiiiiiiiiii");
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data; 
    } catch (error) {
        console.error('Error registering:', error);
        
        if (error.response && error.response.data) {
            return error.response.data; 
        } else {
            return { message: 'Server error' }; 
        }
    }
}


// Function to delete a task


