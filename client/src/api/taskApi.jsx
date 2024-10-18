// src/api/taskApi.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Change to named import

const API_URL = 'http://localhost:5000'; // Adjust according to your server

export const createTask = async (taskData) => {
    console.log(taskData, "Creating task with the following data:");

    // Get the token from local storage
    const token = localStorage.getItem('token'); // Adjust according to your auth setup
    if (!token) {
        throw new Error('No token found');
    }

    try {
        // Decode the token to get user information
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id; // Adjust based on your token structure

        console.log('Decoded Token:', decodedToken); // Log decoded token for debugging

        // Make the API call to create a new task
        const response = await axios.post(`${API_URL}/task`, {
            ...taskData,
            userId // Pass the userId along with task data
        });

        console.log('Task created successfully:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error while creating task:', error.response ? error.response.data : error.message);
        throw new Error('Failed to create task: ' + (error.response ? error.response.data.message : error.message)); // Throw error for handling in component
    }
};


// Fetch tasks by user ID
export const getTasks = async (userId) => {
    try {
        console.log(userId, "User ID passed to API");  // Ensure the userId is logged correctly
        const response = await axios.get(`${API_URL}/task/${userId}`); // Use the userId value in the URL
        return response.data; // Return the tasks data
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};


export const deleteTask = async (taskId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.delete(`${API_URL}/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Function to update a task
export const updateTask = async (taskId, updatedTaskData) => {
    console.log(taskId, updatedTaskData,"wwwwwwwwwwwwwwwwwwwwwwww")
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.put(`${API_URL}/task/${taskId}`, updatedTaskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};