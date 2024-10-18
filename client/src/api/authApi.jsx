import axiosInstance from './axiosInstance';

// Login User API
export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/login', userData);
        const { token } = response.data;

        if (token) {
            // Store token in localStorage for authenticated routes
            localStorage.setItem('token', token);
            console.log('Token stored successfully');
        }

        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);

        if (error.response) {
            return { message: error.response.data.message || 'Login failed. Please check your credentials.' };
        } else {
            return { message: 'Network error. Please try again later.' };
        }
    }
}

// Register User API
export const registerUser = async (userData) => {
    console.log(userData, "Register API request");
    try {
        const response = await axiosInstance.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering:', error);
        
        if (error.response) {
            console.error('Response data:', error.response.data);
            return { message: error.response.data.message || 'Registration failed.' };
        } else {
            return { message: 'Server error. Please try again later.' };
        }
    }
}